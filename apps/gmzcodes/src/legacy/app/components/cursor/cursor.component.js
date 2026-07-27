import { portfolioDom } from '../../portfolio-dom.js';
import { IS_DESKTOP } from '../../constants/browser.constants';
import linkStyles from '../link/link.module.scss';
import cursorStyles from './cursor.module.scss';

export class Cursor {

  // Elements:
  root = document.querySelector(portfolioDom.cursor.root);
  position = document.querySelector(portfolioDom.cursor.position);
  body = document.body;

  // Callback:
  onAction;

  constructor({
    onAction,
    enabled,
  }) {
    this.onAction = onAction;

    if (IS_DESKTOP) {
      document.documentElement.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
      document.documentElement.addEventListener('mouseout', this.handleMouseOut.bind(this));
    }

    if (enabled) {
      this.show();
    } else {
      this.hide();
    }
  }

  update(x, y, label) {
    this.root.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    this.position.setAttribute('data-position-label', label);
  }

  setModeForElement(target) {
    if (!target) {
      this.root.classList.remove(cursorStyles.isClickable);

      return;
    }

    const { tagName, classList } = target;

    if (tagName === 'BUTTON' || tagName === 'A' || classList.contains(linkStyles.underline)) {
      this.root.classList.add(cursorStyles.isClickable);
    } else {
      this.root.classList.remove(cursorStyles.isClickable);
    }
  }

  hide() {
    this.root.style.display = 'none';
  }

  show() {
    this.root.style.display = 'block';
  }

  handleMouseEnter() {
    this.show();
  }

  handleMouseOut(e) {
    if (!e.relatedTarget && !e.toElement) {
      this.hide();
    }
  }

  disableNative() {
    this.body.style.pointerEvents = 'none';
  }

  enableNative() {
    this.body.style = '';
  }

  setMode(mode) {
    if (mode === 'hidden') {
      this.hide();

      return;
    }

    this.show();

    if (mode === 'interact') {
      this.root.classList.add(cursorStyles.isInteractive);
    } else {
      this.root.classList.remove(cursorStyles.isInteractive);
    }
  }

}
