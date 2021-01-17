import { AudioService } from '../../utils/audio/audio.service';
import { VibrationService } from '../../utils/vibration/vibration.service';

export class Nav {

  // CSS selectors:
  static S_MENU = '.nav__menu';
  static S_BUTTON = '.nav__button';
  static S_ICON = '.nav__icon';

  // CSS classes:
  static C_MENU_OPEN = 'isOpen';
  static C_ICON_CLOSE = 'showCloseIcon';
  static C_ACTION = 'nav__action';

  // Elements:
  button = document.querySelector(Nav.S_BUTTON);
  icon = document.querySelector(Nav.S_ICON);
  menu = document.querySelector(Nav.S_MENU);

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

    this.handleClick = this.handleClick.bind(this);

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

    console.log(id, isChecked);

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
        // Do nothing.
    }
  }

  open() {
    console.log('open');

    if (this.isOpen) return;

    // this.onActionClicked('open'); // TODO: Adjust cursor here...

    this.isOpen = true;

    document.addEventListener('click', this.handleClick);

    this.icon.classList.add(Nav.C_ICON_CLOSE);
    this.menu.classList.add(Nav.C_MENU_OPEN);
    // this.menu.setAttribute('tabindex', 0);
    this.button.setAttribute('aria-expanded', true);

    this.jsPaint.disable();
  }

  close() {
    console.log('close');

    if (!this.isOpen) return;

    // this.onActionClicked(action || 'close'); // TODO: Adjust cursor here...

    this.isOpen = false;

    document.removeEventListener('click', this.handleClick);

    this.icon.classList.remove(Nav.C_ICON_CLOSE);
    this.menu.classList.remove(Nav.C_MENU_OPEN);
    // this.menu.setAttribute('tabindex', -1);
    this.button.setAttribute('aria-expanded', false);

    this.jsPaint.enable();
  }

}
