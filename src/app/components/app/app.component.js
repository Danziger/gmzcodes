import { Ruler } from '../ruler/ruler.component';
import { JsPaint } from '../js-paint/js-paint.component';
import { IS_DESKTOP, IS_BROWSER_SUPPORTED, HAS_TOUCH, HAS_CURSOR } from '../../constants/browser.constants';
import { Cursor } from '../cursor/cursor.component';
import { Footer } from '../footer/footer.component';
import { initializeLinks } from '../link/link.utils';
import { TORINO_VIDEOS } from '../torino/torino.constants';
import { Nav } from '../nav/nav.component';
import { DropZone } from '../drop-zone/drop-zone.component';

import { AppActions } from './app.constants';

export class App {

  // CSS classes:
  static C_HAS_ACTIVE_FOCUS = 'app--hasActiveFocus';
  static C_HAS_ACTIVE_HOVER = 'app--hasActiveHover';
  static C_SHOW_FALLBACK = 'app--showFallback';
  static C_SHOW_SCREENSHOT = 'app--showScreenshot';

  // Paint Actions:
  actionHandlers = {};

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
        root.classList.remove(App.C_HAS_ACTIVE_FOCUS);
      };

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && !focusActive) {
          focusActive = true;
          root.classList.add(App.C_HAS_ACTIVE_FOCUS);
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
      // TODO: Should the addition or removal of this be triggered from within Cursor?
      this.root.classList.add(App.C_HAS_ACTIVE_HOVER);
    }

    // TODO: Also pass handlers instead?
    this.jsPaint = new JsPaint({ uiControls });

    this.actionHandlers = {
      [AppActions.ADD_GLOBAL_CLASS]: this.handleAddGlobalClass.bind(this),
      [AppActions.REMOVE_GLOBAL_CLASS]: this.handleRemoveGlobalClass.bind(this),

      // TODO: Just pass a ref to jsPaint instead to all UI components:
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
      this.root.classList.add(App.C_HAS_ACTIVE_HOVER);
    }

    this.root.classList.add(App.C_SHOW_FALLBACK);

    // Hide menu:
    document.querySelector('#menuButton').setAttribute('hidden', true);
    document.querySelector('#menuButton').setAttribute('aria-hidden', true);

    // Show the right title:
    document.querySelector('.content__regularHeader').setAttribute('hidden', true);
    document.querySelector('.content__regularHeader').setAttribute('aria-hidden', true);
    document.querySelector('.content__warningHeader').removeAttribute('hidden');
    document.querySelector('.content__warningHeader').removeAttribute('aria-hidden');

    // Load one video:
    const torinoVideo = TORINO_VIDEOS[Math.floor(Math.random() * TORINO_VIDEOS.length)];

    document.querySelector('.content__videoPlaceholder').innerHTML = `
      <video class="content__video" loop autoplay muted playsinline>
        <source src="${ torinoVideo.src }" type="video/mp4" />
      </video>
    `;

    const videoDescriptionElement = document.querySelector('.content__videoDescription');

    videoDescriptionElement.innerHTML = videoDescriptionElement.innerHTML.replace(/^Scene/, torinoVideo.description);

    // Hide ruler:
    this.ruler = new Ruler(false);

    // Hide footer:
    this.footer = new Footer(false);

    // Show the right URL:
    if (window.location.hash !== '#uncool') window.location.replace('#uncool');
  }

  enableScreenshotMode() {
    this.root.classList.add(App.C_SHOW_SCREENSHOT);
  }

  disableScreenshotMode() {
    this.root.classList.remove(App.C_SHOW_SCREENSHOT);
  }

  handleAction(type, payload) {
    const actionHandler = this.actionHandlers[type];

    if (actionHandler) actionHandler(payload);
  }

  handleAddGlobalClass() {
    // TODO: TO avoid changing this.body.classList from each component...
    console.log(!!this);
  }

  handleRemoveGlobalClass() {
    // TODO: TO avoid changing this.body.classList from each component...
    console.log(!!this);
  }

  // handleToggleGlobalClass

  handleFileUpload(imageFile) {
    if (!imageFile || !imageFile.type.startsWith('image/')) {
      this.uiControls.dropZone.showError();

      return;
    }

    const { jsPaint } = this;

    function eightBit(img, pixelSize) {
      // TODO: Use PNG metadata to know if an image was generated with this tool and with what devicePixelRatio.
      // Those that are "originals" (we should include a hash) should be uploaded as-is, without any kind of resizing.

      const useDevicePixelRatio = false;

      const { devicePixelRatio = 1 } = window;
      const scale = useDevicePixelRatio ? devicePixelRatio : 1;

      const imageWidth = img.width;
      const imageHeight = img.height;

      const canvas = document.createElement('CANVAS');
      const ctx = canvas.getContext('2d');

      const canvasWidth = imageWidth / scale;
      const canvasHeight = imageHeight / scale;

      const scaledImageWidth = canvasWidth / pixelSize;
      const scaledImageHeight = canvasHeight / pixelSize;

      // Common:

      canvas.setAttribute('width', canvasWidth);
      canvas.setAttribute('height', canvasHeight);

      ctx.mozImageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;

      // TODO: Add try-catch?

      ctx.drawImage(img, 0, 0, imageWidth, imageHeight, 0, 0, scaledImageWidth, scaledImageHeight);
      ctx.drawImage(canvas, 0, 0, scaledImageWidth, scaledImageHeight, 0, 0, canvasWidth, canvasHeight);

      // This can be used to provide an upload + resizing UI so that users can choose the scale and preview the result:

      // canvas.style.position = 'fixed';
      // canvas.style.top = '0';
      // canvas.style.left = '0';
      // canvas.style.zIndex = 999999;
      // canvas.style.imageRendering = 'pixelated';
      // canvas.style.width = `${ canvasWidth }px`;
      // canvas.style.height = `${ canvasHeight }px`;

      // document.body.appendChild(canvas);

      jsPaint.drawImage(canvas);
    }

    const img = new Image();

    img.onload = () => {
      // Free memory:
      URL.revokeObjectURL(img.src);

      eightBit(img, jsPaint.unit);
    };

    img.src = URL.createObjectURL(imageFile);
  }

  handleColorChange(hexColor) {
    this.jsPaint.setColor(hexColor);
    this.root.style.setProperty('--c-current', hexColor); // TODO: This should be updated by calling setColor
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
