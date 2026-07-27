import { portfolioDom } from '../../portfolio-dom.js';
import { AudioService } from '../../utils/audio/audio.service';
import { VibrationService } from '../../utils/vibration/vibration.service';
import { AppActions } from '../app/app.constants';
import navStyles from './nav.module.scss';

export class Nav {

  // Elements:
  magicWandButton = document.querySelector(portfolioDom.nav.wand);
  menuButton = document.querySelector(portfolioDom.nav.menuButton);
  menuButtonIcon = document.querySelector(portfolioDom.nav.menuIcon);
  menu = document.querySelector(portfolioDom.nav.menu);
  actions = document.querySelectorAll(portfolioDom.nav.actions);
  logoLink = document.querySelector(portfolioDom.nav.logoLink);
  menuFileInput = document.querySelector(portfolioDom.nav.fileInput);

  // Callback:
  onAction;

  // State:
  isOpen = false;

  constructor({
    onAction,
  }) {
    this.onAction = onAction;

    const vibrationButton = document.querySelector(portfolioDom.nav.vibration);
    const soundButton = document.querySelector(portfolioDom.nav.sound);

    if (vibrationButton) {
      vibrationButton.setAttribute('aria-checked', VibrationService.enabled);
    }

    if (soundButton) {
      soundButton.setAttribute('aria-checked', AudioService.enabled);
    }

    if (!this.menuButton || !this.magicWandButton || !this.menuFileInput) {
      console.error('Nav: required elements missing — portfolio interactivity disabled.');
      return;
    }

    this.handleMagicButtonClick = this.handleMagicButtonClick.bind(this);
    this.handleMenuButtonClick = this.handleMenuButtonClick.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);

    this.addEventListeners();
  }

  addEventListeners() {
    this.menuButton.addEventListener('click', this.handleMenuButtonClick);

    this.magicWandButton.addEventListener('click', this.handleMagicButtonClick);

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
    const action = target.closest('[data-portfolio="nav-action"]');
    const id = action?.id ?? null;
    const isChecked = target.hasAttribute('aria-checked') ? target.getAttribute('aria-checked') === 'true' : null;

    if (isChecked === true) {
      target.setAttribute('aria-checked', false);
    } else if (isChecked === false) {
      target.setAttribute('aria-checked', true);
    }

    if (isChecked === null || id === 'ruler') {
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

  handleFileUpload(e) {
    this.onAction(AppActions.UPLOAD, e.currentTarget.files[0]);
  }

  open() {
    if (this.isOpen) return;

    VibrationService.vibrate(100);

    this.isOpen = true;

    document.addEventListener('click', this.handleMenuClick);
    document.addEventListener('keydown', this.handleKeyDown);

    this.menuButton.setAttribute('aria-expanded', true);
    this.menuButtonIcon.classList.add(navStyles.iconClose);
    this.menu.classList.add(navStyles.menuOpen);
    this.actions.forEach((action) => action.removeAttribute('tabindex'));

    this.onAction(AppActions.DISABLE);
    this.onAction(AppActions.CHANGE_CURSOR_MODE, 'interact');
  }

  close() {
    if (!this.isOpen) return;

    VibrationService.vibrate(100);

    this.isOpen = false;

    document.removeEventListener('click', this.handleMenuClick);
    document.removeEventListener('keydown', this.handleKeyDown);

    this.menuButton.setAttribute('aria-expanded', false);
    this.menuButtonIcon.classList.remove(navStyles.iconClose);
    this.menu.classList.remove(navStyles.menuOpen);
    this.actions.forEach((action) => action.setAttribute('tabindex', -1));

    this.onAction(AppActions.ENABLE);
    this.onAction(AppActions.CHANGE_CURSOR_MODE, 'paint');
  }

  showAttribution({
    name,
    surname,
    websiteURL,
  }) {
    if (!this.attributionByName) return;

    this.attributionByName.textContent = `By ${ name }`;
    this.attributionSurname.textContent = surname;
    this.attribution.href = websiteURL;

    this.hiring.setAttribute('hidden', true);
    this.attribution.removeAttribute('hidden');
  }

  hideAttribution() {
    if (!this.attributionByName) return;

    this.hiring.removeAttribute('hidden');
    this.attribution.setAttribute('hidden', true);
  }

}
