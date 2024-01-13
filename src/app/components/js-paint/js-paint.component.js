import { addMetadata } from 'meta-png';

import { IS_DESKTOP, HAS_TOUCH, HAS_CURSOR } from '../../constants/browser.constants';
import { rgbToHex } from '../../utils/color/color.utils';
import { AudioService } from '../../utils/audio/audio.service';
import { VibrationService } from '../../utils/vibration/vibration.service';
import { clamp, randomInt, roundStep } from '../../utils/math/math.utils';
import { waitOneFrame } from '../../utils/promises/promises.utils';
import { loadImage } from '../../utils/image-loader/image-loader.utils';
import { ImageUploadFields } from '../../utils/image-upload/image-upload.constants';

import { COLOR_TO_FREQ, FILENAMES, FILENAME_ADJECTIVES } from './js-paint.constants';

export class JsPaint {

  static BACKGROUND_COLOR = '#FFFFFF';
  static KEY_RATE = 50;

  scale = window.devicePixelRatio || 1;
  unit = 8;
  scaledUnit = this.unit * this.scale;
  color = '#000000';
  drawing = false;
  lastX = null;
  lastY = null;
  offsetLeft = 0;
  offsetTop = 0;
  pressedKeys = {};
  isSpacePressed = false;
  isMousePressed = false;
  disabled = false;
  pristine = true;
  lastDrawingIndex = null;

  // Elements:
  canvas = document.querySelector('.jsPaint__root');
  ctx = this.canvas.getContext('2d');

  // TODO: willReadFrequently forces the canvas to use only the CPU. That might be useful when calling getImageData a
  // lot, so this option should be used only when the accessibility sound is enabled.
  // ctx = this.canvas.getContext('2d', { willReadFrequently: true });

  // TODO: Check if the performance improves with https://github.com/jagenjo/Canvas2DtoWebGL/tree/master.
  // ctx = window.enableWebGLCanvas(this.canvas);

  // TODO: Should these come from the components in `uiControls`?
  contentRoot = document.querySelector('.content__root');
  footerRoot = document.querySelector('.footer__root');

  // UI Components:

  uiControls = {
    nav: null,
    footer: null,
    ruler: null,
    cursor: null,
  };

  // State:
  keysIntervalID = null;

  // eslint-disable-next-line class-methods-use-this
  resetHybridModeImplementation = () => undefined;

  constructor(options) {
    this.uiControls = options.uiControls;

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.keysUpdate = this.keysUpdate.bind(this);

    this.reset({ vibrate: false });
    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('resize', this.handleResize);

    if (HAS_CURSOR) {
      document.addEventListener('mousedown', this.handleMouseDown);
      document.addEventListener('mousemove', this.handleMove);
      document.addEventListener('mouseup', this.handleStop);
      document.addEventListener('mouseleave', this.handleStop);
    } else if (HAS_TOUCH) {
      document.addEventListener('touchstart', this.handleTouchStart);
      document.addEventListener('touchmove', this.handleMove);
      document.addEventListener('touchend', this.handleStop);
      document.addEventListener('touchcancel', this.handleStop);
    }

    if (HAS_CURSOR && HAS_TOUCH) {
      document.addEventListener('touchstart', this.handleTouchStart);
    }

    // Disable context menu:
    document.addEventListener('contextmenu', this.handleContextMenu);

    if (IS_DESKTOP) {
      document.addEventListener('keydown', this.handleKeyDown);
      document.addEventListener('keyup', this.handleKeyUp);
    }
  }

  // EVENT BINDING / UNBINDING:

  setMouseMode() {
    if (!HAS_CURSOR || !HAS_TOUCH) return;

    document.removeEventListener('touchstart', this.handleTouchStart);

    this.resetHybridModeImplementation = () => {
      document.addEventListener('touchstart', this.handleTouchStart);
    };
  }

  setTouchMode() {
    if (!HAS_CURSOR || !HAS_TOUCH) return;

    const { cursor } = this.uiControls;

    if (cursor) cursor.hide();

    document.addEventListener('touchmove', this.handleMove);
    document.addEventListener('touchend', this.handleStop);
    document.addEventListener('touchcancel', this.handleStop);

    document.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mousemove', this.handleMove);
    document.removeEventListener('mouseup', this.handleStop);
    document.removeEventListener('mouseleave', this.handleStop);

    this.resetHybridModeImplementation = () => {
      document.removeEventListener('touchmove', this.handleMove);
      document.removeEventListener('touchend', this.handleStop);
      document.removeEventListener('touchcancel', this.handleStop);

      document.addEventListener('mousedown', this.handleMouseDown);
      document.addEventListener('mousemove', this.handleMove);
      document.addEventListener('mouseup', this.handleStop);
      document.addEventListener('mouseleave', this.handleStop);
    };
  }

  resetHybridMode() {
    if (!HAS_CURSOR || !HAS_TOUCH) return;

    this.resetHybridModeImplementation();

    const { cursor } = this.uiControls;

    if (cursor) cursor.show();
  }

  // TOUCH EVENT HANDLING:

  handleTouchStart(e) {
    this.setTouchMode();

    if (this.keysIntervalID || this.disabled) return;

    const { target } = e;

    if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.parentElement.tagName === 'A') return;

    this.isMousePressed = true;
    this.touch(e.pageX, e.pageY, true);
  }

  // MOUSE EVENT HANDLING:

  handleMouseDown(e) {
    this.setMouseMode();

    if (this.keysIntervalID || this.disabled) return;

    const { which, target } = e;

    if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.parentElement.tagName === 'A') return;

    // PRIMARY = 1, WHEEL = 2, SECONDARY = 3
    if (which !== 2) {
      this.isMousePressed = true;
      this.touch(e.pageX, e.pageY, which === 1);
    }
  }

  handleContextMenu(e) {
    if (this.disabled) return;

    const { target } = e;

    if (!target || (target.tagName !== 'A'
      && target.parentElement.tagName !== 'A' && window.getSelection().toString() === '')) {
      e.preventDefault();
    }
  }

  // SHARED EVENT HANDLING:

  handleResize() {
    this.reset({ vibrate: false });
  }

  handleMove(e) {
    // Just trying to make it fast. See https://stackoverflow.com/questions/63848298/touch-move-is-really-slow
    // e.preventDefault();
    e.stopPropagation();

    if (this.keysIntervalID/* || this.disabled */) return;

    const { pageX } = e.touches ? e.touches[0] : e;
    const { pageY } = e.touches ? e.touches[0] : e;

    this.drag(pageX, pageY, e.target);
  }

  handleStop() {
    if (!this.isSpacePressed && !this.isMousePressed) return;

    this.isMousePressed = false;

    this.stopDrawing();

    this.resetHybridMode();
  }

  // KEYBOARD EVENT HANDLING:

  handleKeyDown({ key, repeat, shiftKey }) {
    if (repeat || this.disabled) return;

    if (key === ' ' || (key === 'Shift' && this.isSpacePressed)) {
      this.isSpacePressed = true;

      this.touch(this.lastX, this.lastY, !shiftKey, true);

      return;
    }

    if (!key.startsWith('Arrow')) return;

    const { cursor } = this.uiControls;

    if (cursor) {
      cursor.disableNative();
      cursor.show();
    }

    this.pressedKeys[key] = true;

    window.clearInterval(this.keysIntervalID);

    this.keysUpdate();

    this.keysIntervalID = window.setTimeout(() => {
      this.keysIntervalID = window.setInterval(this.keysUpdate, JsPaint.KEY_RATE);
    }, JsPaint.KEY_RATE * 2);
  }

  handleKeyUp({ key, repeat }) {
    if (repeat || this.disabled) return;

    if (key === ' ') {
      this.isSpacePressed = false;

      this.stopDrawing();
    } else if (key === 'Shift') {
      this.ctx.fillStyle = this.color;
    }

    /*
    const colorNumber = parseInt(key, 10);

    if (isNaN(colorNumber) || colorNumber <= 0 || colorNumber > colors.children.length - 1) return;

    colors.children[colorNumber - 1].children[0].click();
    */

    if (!key.startsWith('Arrow')) return;

    delete this.pressedKeys[key];

    if (Object.keys(this.pressedKeys).length === 0) {
      const { cursor } = this.uiControls;

      if (cursor) cursor.enableNative();

      window.clearInterval(this.keysIntervalID);

      this.keysIntervalID = null;
    }
  }

  keysUpdate() {
    const { pressedKeys } = this;

    let x = this.lastX;
    let y = this.lastY;

    x += pressedKeys.ArrowRight ? 1 : 0;
    x -= pressedKeys.ArrowLeft ? 1 : 0;
    y -= pressedKeys.ArrowUp ? 1 : 0;
    y += pressedKeys.ArrowDown ? 1 : 0;

    this.drag(
      clamp(0, x, (window.innerWidth - 1) / this.unit | 0),
      clamp(0, y, (window.innerHeight - 1) / this.unit | 0),
    );
  }

  // DRAWING / CANVAS:

  reset({
    vibrate = true,
  } = {}) {
    const { canvas, ctx, scale } = this;

    canvas.setAttribute('width', window.innerWidth * scale);
    canvas.setAttribute('height', window.innerHeight * scale);

    ctx.fillStyle = JsPaint.BACKGROUND_COLOR;

    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    ctx.fillRect(0, 0, window.innerWidth * scale, window.innerHeight * scale);

    this.pristine = true;
    this.lastDrawingIndex = null;

    const { nav, footer } = this.uiControls;

    if (nav) nav.hideAttribution();
    if (footer) footer.hideAttribution();

    if (vibrate) VibrationService.vibrate(200);
  }

  stopDrawing() {
    if (this.isSpacePressed || this.isMousePressed) return;

    this.drawing = false;
  }

  // Color needs to be in hex format (e.g. #ff0000, not #f00):
  setColor(color) {
    this.ctx.fillStyle = this.color = color;

    VibrationService.vibrate(100);
  }

  touch(pageX, pageY, isPrimary, skipConversion) {
    this.drawing = true;

    const { offsetLeft, offsetTop, unit } = this;
    const { cursor } = this.uiControls;
    const lastX = this.lastX = skipConversion ? pageX : Math.floor((pageX - offsetLeft) / unit);
    const lastY = this.lastY = skipConversion ? pageY : Math.floor((pageY - offsetTop) / unit);

    this.ctx.fillStyle = isPrimary ? this.color : JsPaint.BACKGROUND_COLOR;

    const currentColor = this.ctx.fillStyle.toUpperCase();

    try {
      AudioService.playFreq(COLOR_TO_FREQ[currentColor]);
      AudioService.resume();
    } catch (err) { /* Continue updating the cursor as normal. */ }

    requestAnimationFrame(() => {
      if (cursor) cursor.update(lastX * unit + offsetLeft, lastY * unit + offsetTop, `${ lastX + 1 } , ${ lastY + 1 }`);

      this.paintPixel(lastX, lastY);
    });
  }

  drag(pageX, pageY, target) {
    requestAnimationFrame(() => {
      const { offsetLeft, offsetTop, unit, scaledUnit, lastX, lastY, drawing } = this;
      const x = target ? Math.floor((pageX - offsetLeft) / unit) : pageX;
      const y = target ? Math.floor((pageY - offsetTop) / unit) : pageY;
      const w = Math.abs(x - lastX);
      const h = Math.abs(y - lastY);
      const hasPositionChanged = this.lastX !== x || this.lastY !== y;

      this.lastX = x;
      this.lastY = y;

      const { cursor } = this.uiControls;

      if (!cursor) return;

      // TODO: Consider updating the cursor position continuously if in interactive mode:
      if (hasPositionChanged) cursor.update(x * unit + offsetLeft, y * unit + offsetTop, `${ x + 1 } , ${ y + 1 }`);

      if (!drawing) cursor.setModeForElement(target);

      if (this.disabled) return;

      if (drawing) {
        if (w === 0 && h === 0) {
          this.paintPixel(x, y);
        } else if (w > h) {
          this.lineLandscape(lastX, lastY, x, y);
        } else {
          this.linePortrait(lastX, lastY, x, y);
        }
      }

      if (AudioService.enabled) {
        const currentColor = drawing ? this.ctx.fillStyle.toUpperCase() : rgbToHex(
          ...this.ctx.getImageData(x * scaledUnit + offsetLeft, y * scaledUnit + offsetTop, 1, 1).data,
        );

        try {
          AudioService.playFreq(COLOR_TO_FREQ[currentColor]);
          AudioService.resume();
        } catch (err) { /* Continue updating the cursor as normal. */ }
      }
    });
  }

  paintPixel(x, y) {
    const { ctx, scaledUnit, offsetLeft, offsetTop } = this;

    this.pristine = false;

    ctx.fillRect(x * scaledUnit + offsetLeft, y * scaledUnit + offsetTop, scaledUnit, scaledUnit);
  }

  lineLandscape(x0, y0, x1, y1) {
    if (x0 > x1) {
      // eslint-disable-next-line no-param-reassign
      [x0, x1] = [x1, x0];
      // eslint-disable-next-line no-param-reassign
      [y0, y1] = [y1, y0];
    }

    const dx = x1 - x0;
    const dy = Math.abs(y1 - y0);
    const yi = y0 > y1 ? -1 : 1;

    let D = 2 * dy - dx;
    let y = y0;

    for (let x = x0; x <= x1; ++x) {
      this.paintPixel(x, y);

      if (D > 0) {
        y += yi;
        D -= 2 * dx;
      }

      D += 2 * dy;
    }
  }

  linePortrait(x0, y0, x1, y1) {
    if (y0 > y1) {
      // eslint-disable-next-line no-param-reassign
      [x0, x1] = [x1, x0];
      // eslint-disable-next-line no-param-reassign
      [y0, y1] = [y1, y0];
    }

    const dx = Math.abs(x1 - x0);
    const dy = y1 - y0;
    const xi = x0 > x1 ? -1 : 1;

    let D = 2 * dx - dy;
    let x = x0;

    for (let y = y0; y <= y1; ++y) {
      this.paintPixel(x, y);

      if (D > 0) {
        x += xi;
        D -= 2 * dy;
      }

      D += 2 * dx;
    }
  }

  enable() {
    this.disabled = false;
  }

  disable() {
    this.disabled = true;

    AudioService.stop();
  }

  clear() {
    if (!this.pristine) {
      // TODO: Replace with a custom HTML modal:

      // eslint-disable-next-line no-alert, no-restricted-globals
      const continueAndReplace = confirm(
        // eslint-disable-next-line max-len
        'You will lose your current progress. Are you sure you want to proceed?',
      );

      if (continueAndReplace) this.reset({ vibrate: true });

      return continueAndReplace;
    }

    return true;
  }

  download() {
    this.canvas.toBlob(async (blob) => {
      let uintArr = new Uint8Array(await blob.arrayBuffer());

      uintArr = addMetadata(uintArr, ImageUploadFields.devicePixelRatio, window.devicePixelRatio);
      uintArr = addMetadata(uintArr, ImageUploadFields.lastModified, Date.now());

      const blobWithMetadata = new Blob([uintArr], { type: 'image/png' });

      const link = document.createElement('A');

      // eslint-disable-next-line max-len
      link.download = `${ FILENAMES[Math.floor(Math.random() * FILENAMES.length)] }${ FILENAME_ADJECTIVES[Math.floor(Math.random() * FILENAME_ADJECTIVES.length)] }.png`;
      link.href = URL.createObjectURL(blobWithMetadata);
      link.target = '_blank';
      link.click();
    }, 'image/png');

    // TODO: Use this as fallback in case the code above throws an error:

    // const link = document.createElement('A');

    // eslint-disable-next-line max-len
    // link.download = `${ FILENAMES[Math.floor(Math.random() * FILENAMES.length)] }${ FILENAME_ADJECTIVES[Math.floor(Math.random() * FILENAME_ADJECTIVES.length)] }.png`;
    // link.href = this.canvas.toDataURL();
    // link.target = '_blank';
    // link.click();
  }

  // DRAW (UPLOAD) IMAGE:

  drawImage(canvas) {
    const { ctx, unit } = this;

    const roundedWidth = roundStep(canvas.width, unit);
    const roundedHeight = roundStep(canvas.height, unit);

    if (roundedWidth === 0 || roundedHeight === 0) return;

    const isClear = this.clear();

    if (!isClear) return;

    const dx = roundStep((window.innerWidth - roundedWidth) / 2, unit);
    const dy = roundStep((window.innerHeight - roundedHeight) / 2, unit);

    // TODO: Consider setting `scale` globally in JsPaint:
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.drawImage(canvas, dx, dy);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  // DRAW (MAGIC) IMAGE:

  async magicDrawing() {
    const isClear = this.clear();

    if (!isClear) return;

    const previousColor = this.color;

    this.disable();

    const preMadeImages = [
      'drawings/monkey-by-daniel-sheldon-compressed.png',
      'drawings/superhero-by-daniel-sheldon-compressed.png',
    ];

    let randomIndex = 0;

    do {
      randomIndex = randomInt(0, preMadeImages.length - 1);
    } while (randomIndex === this.lastDrawingIndex);

    this.lastDrawingIndex = randomIndex;

    const imageURL = preMadeImages[randomIndex];
    const artistSlug = imageURL.split('-by-').pop().replace('-compressed.png', '');
    const artistMetadataURL = `drawings/artists/${ artistSlug }/${ artistSlug }.json`;
    const artistProfilePictureURL = `drawings/artists/${ artistSlug }/${ artistSlug }-profile-picture.jpeg`;

    const imagePromise = loadImage(imageURL);

    const authorMetadataPromise = fetch(artistMetadataURL).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error = ${ response.status }`);
      }

      return response.json();
    });

    const [{
      imageWidth,
      imageHeight,
      getPixelColor,
    }, artistInfo] = await Promise.all([
      imagePromise,
      authorMetadataPromise,
    ]);

    const { ruler } = this.uiControls;

    const availableWidth = document.body.offsetWidth / this.unit;
    const startY = ruler.isRulerActive ? 0 : this.contentRoot.getBoundingClientRect().bottom;
    const endY = ruler.isRulerActive ? document.body.offsetHeight : this.footerRoot.getBoundingClientRect().top;
    const availableHeight = (endY - startY) / this.unit;
    const initialX = Math.round(availableWidth / 2 - imageWidth / 2);
    const initialY = Math.round(startY / this.unit + availableHeight / 2 - imageHeight / 2);

    let prevColor = null;
    let prevX = null;
    let prevY = null;
    let paintedPixels = 0;

    // TODO: Add modem-like sound while this runs?

    try {

      // TODO: Use a new instance for this:
      // AudioService.enable();

      for (let y = 0; y < imageHeight; ++y) {
        const translatedY = initialY + y;

        for (let x = 0; x < imageWidth; ++x) {
          const translatedX = initialX + x;

          if (prevColor) {
            this.setColor(prevColor);
            this.paintPixel(prevX, prevY);
          }

          this.setColor('#FF00FF');
          this.paintPixel(translatedX, translatedY);

          prevX = translatedX;
          prevY = translatedY;
          prevColor = getPixelColor(x, y);

          if (prevColor !== '#FFFFFF') {
            ++paintedPixels;

            if (paintedPixels % 8 === 0) {
              // TODO: Replace the `this.lastDrawingIndex !== randomIndex` with AbortController and signals:

              // AudioService.playFreq(50);
              // AudioService.resume();

              // eslint-disable-next-line no-await-in-loop
              await waitOneFrame(1);

              // AudioService.stop();
            }
          }

          if (this.lastDrawingIndex !== randomIndex) {
            throw new Error('Aborted');
          }
        }
      }

      // AudioService.disable();

      // Paint last pixel in the right color:

      this.setColor(prevColor);
      this.paintPixel(prevX, prevY);

      // Show attribution:

      const { nav, footer } = this.uiControls;

      nav.showAttribution(artistInfo);
      footer.showAttribution(artistInfo);

    } catch (err) {
      if (err.name !== 'Aborted') console.error(err);

      // Drawing aborted, either because the the magic drawing button has been clicked again,
      // or because the magic drawing was aborted for any other reason (e.g. resize):
    } finally {
      // Leave everything as it was:

      if (this.lastDrawingIndex === null) {
        this.enable();
        this.setColor(previousColor);
      }
    }
  }

}
