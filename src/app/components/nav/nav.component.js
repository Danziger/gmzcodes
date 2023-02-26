import { AudioService } from '../../utils/audio/audio.service';
import { VibrationService } from '../../utils/vibration/vibration.service';

export class Nav {

  // CSS selectors:
  static S_MENU = '#menu';
  static S_BUTTON = '.nav__button';
  static S_ICON = '.nav__icon';
  static S_ACTIONS = '.nav__action, .nav__githubLink';
  static S_LOGO_LINK = '.nav__logoLink';
  static S_VIBRATION_BUTTON = '#vibration';
  static S_SOUND_BUTTON = '#sound';

  // CSS classes:
  static C_MENU_OPEN = 'isOpen';
  static C_ICON_CLOSE = 'showCloseIcon';
  static C_ACTION = 'nav__action';

  // Elements:
  button = document.querySelector(Nav.S_BUTTON);
  icon = document.querySelector(Nav.S_ICON);
  menu = document.querySelector(Nav.S_MENU);
  actions = document.querySelectorAll(Nav.S_ACTIONS);
  logoLink = document.querySelector(Nav.S_LOGO_LINK);

  // Components:
  jsPaint;
  ruler;
  cursor;

  // State:
  isOpen = false;

  constructor({ jsPaint, ruler, cursor }) {
    this.jsPaint = jsPaint;
    this.ruler = ruler;
    this.cursor = cursor;

    document.querySelector(Nav.S_VIBRATION_BUTTON).setAttribute('aria-checked', VibrationService.enabled);
    document.querySelector(Nav.S_SOUND_BUTTON).setAttribute('aria-checked', AudioService.enabled);

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.addEventListeners();
  }

  addEventListeners() {
    this.button.addEventListener('click', this.handleClick);
  }

  handleClick(e) {
    const { target } = e;

    // If we click the menu button:
    if (target === this.button) {
      e.stopPropagation();

      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }

      return;
    }

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
        this.jsPaint.reset();
        break;

      case 'download':
        this.jsPaint.download();
        break;

      case 'ruler':
        if (isChecked) {
          this.ruler.close();
        } else {
          this.ruler.open();
        }

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

  open() {
    if (this.isOpen) return;

    VibrationService.vibrate(100);

    this.isOpen = true;

    document.addEventListener('click', this.handleClick);
    document.addEventListener('keydown', this.handleKeyDown);

    this.icon.classList.add(Nav.C_ICON_CLOSE);
    this.menu.classList.add(Nav.C_MENU_OPEN);
    this.button.setAttribute('aria-expanded', true);
    this.actions.forEach((action) => action.removeAttribute('tabindex'));

    this.jsPaint.disable();

    if (this.cursor) this.cursor.setMode('interact');
  }

  close() {
    if (!this.isOpen) return;

    VibrationService.vibrate(100);

    this.isOpen = false;

    document.removeEventListener('click', this.handleClick);
    document.removeEventListener('keydown', this.handleKeyDown);

    this.icon.classList.remove(Nav.C_ICON_CLOSE);
    this.menu.classList.remove(Nav.C_MENU_OPEN);
    this.button.setAttribute('aria-expanded', false);
    this.actions.forEach((action) => action.setAttribute('tabindex', -1));

    this.jsPaint.enable();

    if (this.cursor) this.cursor.setMode('paint');
  }

}