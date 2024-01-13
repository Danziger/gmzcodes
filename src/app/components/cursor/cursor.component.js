import { HAS_CURSOR, IS_DESKTOP } from '../../constants/browser.constants';

export class Cursor {

  // CSS classes:
  static C_IS_CLICKABLE = 'cursor--isClickable';
  static C_IS_INTERACTIVE = 'cursor--isInteractive';

  // CSS selectors:
  static S_ROOT = '.cursor__root';
  static S_POSITION = '.cursor__position';

  // Elements:
  root = document.querySelector(Cursor.S_ROOT);
  position = document.querySelector(Cursor.S_POSITION);
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
    this.root.style.transform = `translate(${ x }px, ${ y }px)`;
    this.position.setAttribute('data-position-label', label);
  }

  setModeForElement(target) {
    if (!target) {
      this.root.classList.remove(Cursor.C_IS_CLICKABLE);

      return;
    }

    const { tagName, className } = target;

    if (tagName === 'BUTTON' || tagName === 'A' || className === 'content__underline') {
      this.root.classList.add(Cursor.C_IS_CLICKABLE);
    } else {
      this.root.classList.remove(Cursor.C_IS_CLICKABLE);
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
      this.root.classList.add(Cursor.C_IS_INTERACTIVE);
    } else {
      // mode === 'paint' || mode === 'hidden'
      this.root.classList.remove(Cursor.C_IS_INTERACTIVE);
    }
  }

}
