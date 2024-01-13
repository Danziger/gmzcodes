import { AudioService } from '../../utils/audio/audio.service';
import { VibrationService } from '../../utils/vibration/vibration.service';
import { AppActions } from '../app/app.constants';

export class Nav {

  // CSS selectors:
  static S_WAND_BUTTON = '#magicWandButton';
  static S_MENU_BUTTON = '#menuButton';
  static S_MENU_BUTTON_ICON = '.nav__icon';
  static S_MENU = '#menu';
  static S_ACTIONS = '.nav__action, .nav__githubLink';
  static S_LOGO_LINK = '.nav__logoLink';
  static S_VIBRATION_BUTTON = '#vibration';
  static S_SOUND_BUTTON = '#sound';
  static S_DROP_ZONE = '#dropZone';
  static S_MENU_FILE_INPUT = '#menuFileInput';

  // CSS classes:
  static C_MENU_OPEN = 'isOpen';
  static C_ICON_CLOSE = 'showCloseIcon';
  static C_ACTION = 'nav__action';

  // Elements:
  magicWandButton = document.querySelector(Nav.S_WAND_BUTTON);
  menuButton = document.querySelector(Nav.S_MENU_BUTTON);
  menuButtonIcon = document.querySelector(Nav.S_MENU_BUTTON_ICON);
  menu = document.querySelector(Nav.S_MENU);
  actions = document.querySelectorAll(Nav.S_ACTIONS);
  logoLink = document.querySelector(Nav.S_LOGO_LINK);
  dropZone = document.querySelector(Nav.S_DROP_ZONE);
  menuFileInput = document.querySelector(Nav.S_MENU_FILE_INPUT);

  // Callback:
  onAction;

  // State:
  isOpen = false;

  constructor({
    onAction,
  }) {
    this.onAction = onAction;

    document.querySelector(Nav.S_VIBRATION_BUTTON).setAttribute('aria-checked', VibrationService.enabled);
    document.querySelector(Nav.S_SOUND_BUTTON).setAttribute('aria-checked', AudioService.enabled);

    this.handleMagicButtonClick = this.handleMagicButtonClick.bind(this);
    this.handleMenuButtonClick = this.handleMenuButtonClick.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);

    this.addEventListeners();
  }

  addEventListeners() {
    // Hamburger button:
    this.menuButton.addEventListener('click', this.handleMenuButtonClick);

    // Magic wand:
    this.magicWandButton.addEventListener('click', this.handleMagicButtonClick);

    // File upload:

    window.addEventListener('dragenter', this.handleDragEnter);

    this.menuFileInput.addEventListener('change', this.handleFileUpload);
  }

  handleMagicButtonClick() {
    this.onAction(AppActions.MAGIC_DRAWING);
  }

  handleMenuButtonClick(e) {
    e.stopPropagation();

    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  handleMenuClick(e) {
    const { target } = e;
    const id = target.classList.contains(Nav.C_ACTION) ? target.id : null;
    const isChecked = target.hasAttribute('aria-checked') ? target.getAttribute('aria-checked') === 'true' : null;

    if (isChecked === true) {
      target.setAttribute('aria-checked', false);
    } else if (isChecked === false) {
      target.setAttribute('aria-checked', true);
    }

    // If we clicked a non-switch action or something else:
    if (isChecked === null) {
      this.close();
    }

    switch (id) {
      case 'clear':
        this.onAction(AppActions.CLEAR);
        break;

      case 'download':
        this.onAction(AppActions.DOWNLOAD);
        break;

      case 'ruler':
        this.onAction(AppActions.CHANGE_RULER_MODE, !isChecked);

        break;

      case 'vibration':
        if (isChecked) {
          VibrationService.disable();
        } else {
          VibrationService.enable();
        }

        break;

      case 'sound':
        if (isChecked) {
          AudioService.disable();
        } else {
          AudioService.enable();
        }

        break;

      default:
        return;
        // Do nothing.
    }

    VibrationService.vibrate(100);
  }

  handleKeyDown(e) {
    const { code, shiftKey } = e;

    if (code === 'Escape') {
      this.close();
    } else if (code === 'Tab') {
      const { activeElement } = document;
      const { logoLink } = this;
      const lastAction = this.actions[this.actions.length - 1];

      let handled = false;

      if (shiftKey && activeElement === logoLink && lastAction) {
        handled = true;

        lastAction.focus();
      } else if (!shiftKey && activeElement === lastAction && logoLink) {
        handled = true;

        logoLink.focus();
      }

      if (handled) e.preventDefault();
    }
  }

  handleDrop(e) {
    e.preventDefault();

    const file = e.dataTransfer.files[0] || e.dataTransfer.items.filter((item) => item.kind === 'file')[0]?.getAsFile();

    this.uploadImage(file);

    this.handleDragLeave();
  }

  // eslint-disable-next-line class-methods-use-this
  handleDragOver(e) {
    e.preventDefault();
  }

  handleDragLeave() {
    this.dropZone.removeEventListener('drop', this.handleDrop);
    this.dropZone.removeEventListener('dragover', this.handleDragOver);
    this.dropZone.removeEventListener('dragleave', this.handleDragLeave);
    this.dropZone.setAttribute('hidden', true);
  }

  handleDragEnter() {
    this.dropZone.addEventListener('drop', this.handleDrop);
    this.dropZone.addEventListener('dragover', this.handleDragOver);
    this.dropZone.addEventListener('dragleave', this.handleDragLeave);
    this.dropZone.removeAttribute('hidden');
  }

  handleFileUpload(e) {
    const { currentTarget } = e;

    this.uploadImage(currentTarget.files[0]);
  }

  // eslint-disable-next-line class-methods-use-this
  uploadImage(imageFile) {
    console.log('imageFile =', imageFile);

    if (imageFile) {
      // TODO: Check image type
    } else {
      // TODO: Show error message...
    }

    function eightBit(img, pixelSize) {
      const adjustToDevice = true;

      const scale = adjustToDevice ? (window.devicePixelRatio || 1) : 1;

      const imageWidth = img.width;
      const imageHeight = img.height;

      const canvas = document.createElement('CANVAS');
      const ctx = canvas.getContext('2d');

      // !adjustToDevice:

      // const canvasWidth = imageWidth;
      // const canvasHeight = imageHeight;

      // const scaledImageWidth = imageWidth / scale / pixelSize;
      // const scaledImageHeight = imageHeight / scale / pixelSize;

      // adjustToDevice:

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

      // !adjustToDevice:
      // ctx.drawImage(img, 0, 0, imageWidth, imageHeight, 0, 0, scaledImageWidth, scaledImageHeight);
      // ctx.drawImage(canvas, 0, 0, scaledImageWidth, scaledImageHeight, 0, 0, imageWidth, imageHeight);

      // adjustToDevice:
      ctx.drawImage(img, 0, 0, imageWidth, imageHeight, 0, 0, scaledImageWidth, scaledImageHeight);
      ctx.drawImage(canvas, 0, 0, scaledImageWidth, scaledImageHeight, 0, 0, canvasWidth, canvasHeight);

      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.zIndex = 999999;
      canvas.style.imageRendering = 'pixelated';
      // !adjustToDevice:
      // canvas.style.width = `${ imageWidth }px`;
      // canvas.style.height = `${ imageHeight }px`;
      // adjustToDevice:
      canvas.style.width = `${ canvasWidth }px`;
      canvas.style.height = `${ canvasHeight }px`;

      // document.body.appendChild(canvas);

      const mainCanvas = document.querySelector('.jsPaint__root');
      const mainCtx = mainCanvas.getContext('2d');

      mainCtx.mozImageSmoothingEnabled = false;
      mainCtx.webkitImageSmoothingEnabled = false;
      mainCtx.imageSmoothingEnabled = false;

      // !adjustToDevice:
      // mainCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
      // mainCtx.drawImage(canvas, 0, 0);
      // mainCtx.drawImage(canvas, 0, 0, imageWidth, imageHeight, 0, 0, imageWidth * scale, imageHeight * scale);

      // adjustToDevice:
      mainCtx.drawImage(canvas, 0, 0, imageWidth, imageHeight, 0, 0, imageWidth * scale, imageHeight * scale);

      // adjustToDevice alternative:
      // mainCtx.scale(scale, scale);
      // mainCtx.drawImage(canvas, 0, 0);

      mainCtx.setTransform(1, 0, 0, 1, 0, 0);
    }

    const pixelSize = 8;

    const img = new Image();

    img.onload = () => {
      // Free memory:
      URL.revokeObjectURL(img.src);

      eightBit(img, pixelSize);
    };

    img.src = URL.createObjectURL(imageFile);
  }

  open() {
    if (this.isOpen) return;

    VibrationService.vibrate(100);

    this.isOpen = true;

    document.addEventListener('click', this.handleMenuClick);
    document.addEventListener('keydown', this.handleKeyDown);

    this.menuButton.setAttribute('aria-expanded', true);
    this.menuButtonIcon.classList.add(Nav.C_ICON_CLOSE);
    this.menu.classList.add(Nav.C_MENU_OPEN);
    this.actions.forEach((action) => action.removeAttribute('tabindex'));

    this.onAction(AppActions.DISABLE);
    this.onAction(AppActions.CHANGE_CURSOR_MODE, 'interact'); // TODO: It should be jsPaint doing this change...
  }

  close() {
    if (!this.isOpen) return;

    VibrationService.vibrate(100);

    this.isOpen = false;

    document.removeEventListener('click', this.handleMenuClick);
    document.removeEventListener('keydown', this.handleKeyDown);

    this.menuButton.setAttribute('aria-expanded', false);
    this.menuButtonIcon.classList.remove(Nav.C_ICON_CLOSE);
    this.menu.classList.remove(Nav.C_MENU_OPEN);
    this.actions.forEach((action) => action.setAttribute('tabindex', -1));

    this.onAction(AppActions.ENABLE);
    this.onAction(AppActions.CHANGE_CURSOR_MODE, 'paint'); // TODO: It should be jsPaint doing this change...
  }

  showAttribution({
    name,
    surname,
    websiteURL,
  }) {
    if (!this.attributionByName) return;

    // TODO: To be implemented...

    this.attributionByName.textContent = `By ${ name }`;
    this.attributionSurname.textContent = surname;
    this.attribution.href = websiteURL;

    this.hiring.setAttribute('hidden', true);
    this.attribution.removeAttribute('hidden');
  }

  hideAttribution() {
    if (!this.attributionByName) return;

    // TODO: To be implemented...

    this.hiring.removeAttribute('hidden');
    this.attribution.setAttribute('hidden', true);
  }

}
