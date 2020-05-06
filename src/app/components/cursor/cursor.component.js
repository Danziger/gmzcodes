export class Cursor {

  // CSS classes:
  static C_IS_CLICKABLE = 'cursor--isClickable';

  // CSS selectors:
  static S_ROOT = '.cursor__root';
  static S_POSITION = '.cursor__position';

  // Elements:
  root = document.querySelector(Cursor.S_ROOT);
  position = document.querySelector(Cursor.S_POSITION);

  update(x, y, label) {
    this.root.style.transform = `translate(${ x }px, ${ y }px)`;
    this.position.textContent = label;
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

}
