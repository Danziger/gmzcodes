import { IS_DESKTOP, HAS_TOUCH } from '../../constants/browser.constants';
import { rgbToHex } from '../../utils/color/color.utils';
import { AudioService } from '../../utils/audio/audio.service';
import { VibrationService } from '../../utils/vibration/vibration.service';
import { clamp } from '../../utils/math/math.utils';

import { COLOR_TO_FREQ } from './js-paint.constants';

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

  // Elements:
  canvas = document.querySelector('.jsPaint__root');
  ctx = this.canvas.getContext('2d');

  // Components:
  cursor = null;

  // State:
  keysIntervalID = null;

  constructor(options) {
    this.cursor = options.cursor;

    this.reset(true);
    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('resize', this.handleResize.bind(this));

    if (HAS_TOUCH) {
      document.addEventListener('touchstart', this.handleTouchStart.bind(this));
      document.addEventListener('touchmove', this.handleMove.bind(this));
      document.addEventListener('touchend', this.handleStop.bind(this));
      document.addEventListener('touchcancel', this.handleStop.bind(this));
    }

    document.addEventListener('mousedown', this.handleMouseDown.bind(this));
    document.addEventListener('mousemove', this.handleMove.bind(this));
    document.addEventListener('mouseup', this.handleStop.bind(this));
    document.addEventListener('mouseleave', this.handleStop.bind(this));

    // Disable context menu:
    document.addEventListener('contextmenu', (e) => {
      const { target } = e;

      if (!target || (target.tagName !== 'A'
        && target.parentElement.tagName !== 'A' && window.getSelection().toString() === '')) {
        e.preventDefault();
      }
    });

    if (IS_DESKTOP) {
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
      document.addEventListener('keyup', this.handleKeyUp.bind(this));

      document.documentElement.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
      document.documentElement.addEventListener('mouseout', this.handleMouseOut.bind(this));
    }
  }

  // TOUCH:

  handleTouchStart(e) {
    if (this.keysIntervalID) return;

    const { target } = e;

    if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.parentElement.tagName === 'A') return;

    this.isMousePressed = true;
    this.touch(e.pageX, e.pageY, true);
  }

  // MOUSE:

  handleMouseDown(e) {
    if (this.keysIntervalID) return;

    const { which, target } = e;

    if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.parentElement.tagName === 'A') return;

    // PRIMARY = 1, WHEEL = 2, SECONDARY = 3
    if (which !== 2) {
      this.isMousePressed = true;
      this.touch(e.pageX, e.pageY, which === 1);
    }
  }

  // SHARED:

  handleResize() {
    this.reset();
  }

  handleMove(e) {
    if (this.keysIntervalID) return;

    const { pageX } = e.touches ? e.touches[0] : e;
    const { pageY } = e.touches ? e.touches[0] : e;

    this.drag(pageX, pageY, e.target);
  }

  handleStop() {
    this.isMousePressed = false;

    this.stopDrawing();
  }

  // DESKTOP:

  handleKeyDown({ key, repeat, shiftKey }) {
    if (repeat) return;

    if (key === ' ' || (this.key === 'Shift' && this.isSpacePressed)) {
      this.isSpacePressed = true;

      this.touch(this.lastX, this.lastY, !shiftKey, true);

      return;
    }

    if (!key.startsWith('Arrow')) return;

    this.pressedKeys[key] = true;

    window.clearInterval(this.keysIntervalID);

    this.keysUpdate();

    this.keysIntervalID = window.setTimeout(() => {
      this.keysIntervalID = window.setInterval(this.keysUpdate.bind(this), JsPaint.KEY_RATE);
    }, JsPaint.KEY_RATE * 2);
  }

  handleKeyUp({ key, repeat }) {
    if (repeat) return;

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

  handleMouseEnter() {
    this.cursor.show();
  }

  handleMouseOut(e) {
    if (!e.relatedTarget && !e.toElement) {
      this.cursor.hide();
    }
  }

  // DRAWING / CANVAS:

  reset(isInitialReset) {
    const { canvas, ctx, scale } = this;

    canvas.setAttribute('width', window.innerWidth * scale);
    canvas.setAttribute('height', window.innerHeight * scale);

    ctx.fillStyle = JsPaint.BACKGROUND_COLOR;
    ctx.fillRect(0, 0, window.innerWidth * scale, window.innerHeight * scale);

    if (!isInitialReset) VibrationService.vibrate(200);
  }

  stopDrawing() {
    if (this.isSpacePressed || this.isMousePressed) return;

    this.drawing = false;
  }

  setColor(color) {
    this.ctx.fillStyle = this.color = color;

    VibrationService.vibrate(100);
  }

  touch(pageX, pageY, isPrimary, skipConversion) {
    this.drawing = true;

    const { offsetLeft, offsetTop, unit, cursor } = this;
    const lastX = this.lastX = skipConversion ? pageX : Math.floor((pageX - offsetLeft) / unit);
    const lastY = this.lastY = skipConversion ? pageY : Math.floor((pageY - offsetTop) / unit);

    this.ctx.fillStyle = isPrimary ? this.color : JsPaint.BACKGROUND_COLOR;

    requestAnimationFrame(() => {
      if (cursor) cursor.update(lastX * unit + offsetLeft, lastY * unit + offsetTop, `${ lastX + 1 } , ${ lastY + 1 }`);

      this.paintPixel(lastX, lastY);
    });
  }

  drag(pageX, pageY, target) {
    const { offsetLeft, offsetTop, unit, scaledUnit, lastX, lastY, cursor, drawing } = this;
    const x = target ? Math.floor((pageX - offsetLeft) / unit) : pageX;
    const y = target ? Math.floor((pageY - offsetTop) / unit) : pageY;

    if (this.lastX === x && this.lastY === y) return;

    this.lastX = x;
    this.lastY = y;

    const w = Math.abs(x - lastX);
    const h = Math.abs(y - lastY);
    const currentColor = drawing ? this.color : rgbToHex(
      ...this.ctx.getImageData(x * scaledUnit + offsetLeft, y * scaledUnit + offsetTop, 1, 1).data,
    );

    try {
      AudioService.playFreq(COLOR_TO_FREQ[currentColor]);
      AudioService.resume();
    } catch (err) { /* Continue updating the cursor as normal. */ }

    requestAnimationFrame(() => {
      if (cursor) cursor.update(x * unit + offsetLeft, y * unit + offsetTop, `${ x + 1 } , ${ y + 1 }`);

      if (drawing) {
        if (w === 0 && h === 0) {
          this.paintPixel(x, y);
        } else if (w > h) {
          this.lineLandscape(lastX, lastY, x, y);
        } else {
          this.linePortrait(lastX, lastY, x, y);
        }
      } else if (cursor) {
        cursor.setModeForElement(target);
      }
    });
  }

  paintPixel(x, y) {
    const { ctx, scaledUnit, offsetLeft, offsetTop } = this;

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

}
