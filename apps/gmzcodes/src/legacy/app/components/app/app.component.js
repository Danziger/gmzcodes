import { getMetadata } from 'meta-png';

import { BodyState, setBodyState } from '../../body-state.js';
import { portfolioDom } from '../../portfolio-dom.js';
import { IS_DESKTOP, IS_BROWSER_SUPPORTED, HAS_TOUCH, HAS_CURSOR } from '../../constants/browser.constants';
import contentStyles from '../content/content.module.scss';
import { Cursor } from '../cursor/cursor.component';
import { DropZone } from '../drop-zone/drop-zone.component';
import { Footer } from '../footer/footer.component';
import { initializeLinks } from '../link/link.utils';
import { JsPaint } from '../js-paint/js-paint.component';
import { Nav } from '../nav/nav.component';
import { Ruler } from '../ruler/ruler.component';
import { TORINO_VIDEOS } from '../torino/torino.constants';
import { ImageUploadFields } from '../../utils/image-upload/image-upload.constants';

import { AppActions } from './app.constants';

export class App {

  // Elements:
  root = document.body;

  // Paint Controller:
  jsPaint = null;

  // UI Components:
  uiControls = {
    nav: null,
    footer: null,
    ruler: null,
    cursor: null,
    dropZone: null,
  };

  constructor() {
    const { root } = this;

    let focusActive = false;

    if (IS_DESKTOP) {
      const disableFocus = () => {
        focusActive = false;
        setBodyState(root, BodyState.FOCUS, false);
      };

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && !focusActive) {
          focusActive = true;
          setBodyState(root, BodyState.FOCUS, true);
        } else if (e.key === 'Escape' && focusActive) {
          disableFocus();
        }
      });

      document.addEventListener('mousedown', disableFocus);
      document.addEventListener('touchstart', disableFocus);
    }

    this.handleAction = this.handleAction.bind(this);

    if (IS_BROWSER_SUPPORTED) {
      initializeLinks();
    }

    if (IS_BROWSER_SUPPORTED && window.location.hash !== '#uncool') {
      this.init();
    } else {
      this.showFallback();
    }
  }

  init() {
    const {
      uiControls,
      handleAction: onAction,
    } = this;

    const nav = new Nav({ onAction });

    const footer = new Footer({ onAction });

    const ruler = new Ruler({ onAction });

    const cursor = new Cursor({
      onAction,
      enabled: HAS_CURSOR,
    });

    const dropZone = new DropZone({ onAction });

    if (HAS_CURSOR) {
      setBodyState(this.root, BodyState.HOVER, true);
    }

    this.jsPaint = new JsPaint({ uiControls });

    this.actionHandlers = {
      [AppActions.ADD_GLOBAL_CLASS]: this.handleAddGlobalClass.bind(this),
      [AppActions.REMOVE_GLOBAL_CLASS]: this.handleRemoveGlobalClass.bind(this),

      [AppActions.MAGIC_DRAWING]: this.jsPaint.magicDrawing.bind(this.jsPaint),
      [AppActions.DISABLE]: this.jsPaint.disable.bind(this.jsPaint),
      [AppActions.ENABLE]: this.jsPaint.enable.bind(this.jsPaint),
      [AppActions.CLEAR]: this.jsPaint.clear.bind(this.jsPaint),
      [AppActions.DOWNLOAD]: this.jsPaint.download.bind(this.jsPaint),
      [AppActions.UPLOAD]: this.handleFileUpload.bind(this),
      [AppActions.CHANGE_COLOR]: this.handleColorChange.bind(this),

      [AppActions.CHANGE_RULER_MODE]: this.handleRulerModeChange.bind(this),
      [AppActions.CHANGE_CURSOR_MODE]: this.handleCursorModeChange.bind(this),
    };

    uiControls.nav = nav;
    uiControls.footer = footer;
    uiControls.ruler = ruler;
    uiControls.cursor = cursor;
    uiControls.dropZone = dropZone;
  }

  showFallback() {
    if (!HAS_TOUCH) {
      setBodyState(this.root, BodyState.HOVER, true);
    }

    setBodyState(this.root, BodyState.FALLBACK, true);

    const menuButton = document.querySelector(portfolioDom.nav.menuButton);

    menuButton.setAttribute('hidden', true);
    menuButton.setAttribute('aria-hidden', true);

    const regularHeader = document.querySelector(portfolioDom.content.regularHeader);
    const warningHeader = document.querySelector(portfolioDom.content.warningHeader);

    regularHeader.setAttribute('hidden', true);
    regularHeader.setAttribute('aria-hidden', true);
    warningHeader.removeAttribute('hidden');
    warningHeader.removeAttribute('aria-hidden');

    const torinoVideo = TORINO_VIDEOS[Math.floor(Math.random() * TORINO_VIDEOS.length)];

    document.querySelector(portfolioDom.content.videoPlaceholder).innerHTML = `
      <video class="${ contentStyles.video }" loop autoplay muted playsinline>
        <source src="${ torinoVideo.src }" type="video/mp4" />
      </video>
    `;

    const videoDescriptionElement = document.querySelector(portfolioDom.content.videoDescription);

    videoDescriptionElement.innerHTML = videoDescriptionElement.innerHTML.replace(/^Scene/, torinoVideo.description);

    this.ruler = new Ruler(false);

    this.footer = new Footer(false);

    if (window.location.hash !== '#uncool') window.location.replace('#uncool');
  }

  enableScreenshotMode() {
    setBodyState(this.root, BodyState.SCREENSHOT, true);
  }

  disableScreenshotMode() {
    setBodyState(this.root, BodyState.SCREENSHOT, false);
  }

  handleAction(type, payload) {
    const actionHandler = this.actionHandlers[type];

    if (actionHandler) actionHandler(payload);
  }

  // eslint-disable-next-line class-methods-use-this
  handleAddGlobalClass() {
    // TODO: TO avoid changing this.body.classList from each component...
  }

  // eslint-disable-next-line class-methods-use-this
  handleRemoveGlobalClass() {
    // TODO: TO avoid changing this.body.classList from each component...
  }

  async handleFileUpload(imageFile) {
    if (!imageFile || !imageFile.type.startsWith('image/')) {
      this.uiControls.dropZone.showError();

      return;
    }

    this.uiControls.nav.close();

    const { jsPaint } = this;

    function eightBit(img, metadata, pixelSize) {
      const {
        devicePixelRatio = 1,
        innerWidth,
        innerHeight,
      } = window;

      if (
        metadata.devicePixelRatio === devicePixelRatio
        && img.width === innerWidth * devicePixelRatio
        && img.height === innerHeight * devicePixelRatio
        && imageFile.lastModified - metadata.lastModified < 4000
      ) {
        // eslint-disable-next-line no-console
        console.info('Direct upload');

        jsPaint.ctx.drawImage(img, 0, 0);

        return;
      }

      const useDevicePixelRatio = false;
      const scale = (useDevicePixelRatio ? devicePixelRatio : metadata.devicePixelRatio) || 1;

      const imageWidth = img.width;
      const imageHeight = img.height;

      const canvas = document.createElement('CANVAS');
      const ctx = canvas.getContext('2d');

      const canvasWidth = imageWidth / scale;
      const canvasHeight = imageHeight / scale;

      const scaledImageWidth = canvasWidth / pixelSize;
      const scaledImageHeight = canvasHeight / pixelSize;

      canvas.setAttribute('width', canvasWidth);
      canvas.setAttribute('height', canvasHeight);

      ctx.mozImageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;

      ctx.drawImage(img, 0, 0, imageWidth, imageHeight, 0, 0, scaledImageWidth, scaledImageHeight);
      ctx.drawImage(canvas, 0, 0, scaledImageWidth, scaledImageHeight, 0, 0, canvasWidth, canvasHeight);

      jsPaint.drawImage(canvas);
    }

    function loadImage(src) {
      return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          resolve(img);
        };

        img.onerror = reject;

        img.src = src;
      });
    }

    const imageSrc = URL.createObjectURL(imageFile);

    const imagePromise = loadImage(imageSrc);

    const metadataPromise = fetch(imageSrc).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error, status = ${ response.status }`);
      }

      return response.arrayBuffer();
    }).then((arrayBuffer) => {
      const arrayBufferView = new Uint8Array(arrayBuffer);

      return {
        devicePixelRatio: parseFloat(getMetadata(arrayBufferView, ImageUploadFields.devicePixelRatio), 10) || null,
        lastModified: parseInt(getMetadata(arrayBufferView, ImageUploadFields.lastModified), 10) || 0,
      };
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);

      return {};
    });

    const [
      metadata,
      image,
    ] = await Promise.allSettled([
      metadataPromise,
      imagePromise,
    ]);

    URL.revokeObjectURL(imageSrc);

    eightBit(image.value, metadata.value, jsPaint.unit);
  }

  handleColorChange(hexColor) {
    this.jsPaint.setColor(hexColor);
    this.root.style.setProperty('--c-current', hexColor);
  }

  handleRulerModeChange(openRuler) {
    if (openRuler) {
      this.uiControls.ruler.open();
    } else {
      this.uiControls.ruler.close();
    }
  }

  handleCursorModeChange(cursorMode) {
    this.uiControls.cursor.setMode(cursorMode);
  }

}
