export class Footer {

  // CSS selectors:
  static S_ROOT = '.footer__root';
  static S_COLORS = '.footer__colors';
  static S_CURRENT = '.footer__sample--isCurrent';

  // CSS classes:
  static C_SAMPLE = 'footer__sample';
  static C_CURRENT = 'footer__sample--isCurrent';

  // Elements:
  root = document.querySelector(Footer.S_ROOT);
  colors = document.querySelector(Footer.S_COLORS);

  // Callbacks:
  onActionClicked;

  constructor(onActionClicked) {
    this.onActionClicked = onActionClicked;

    if (onActionClicked) {
      this.addEventListeners();
      this.show();
    } else {
      this.hide();
    }
  }

  addEventListeners() {
    this.colors.addEventListener('click', ({ target }) => {

      if (!target.classList.contains(Footer.C_SAMPLE)) return;

      const currentSample = document.querySelector(Footer.S_CURRENT);

      if (currentSample) currentSample.classList.remove(Footer.C_CURRENT);

      target.classList.add(Footer.C_CURRENT);

      this.onActionClicked(window.getComputedStyle(target).getPropertyValue('--bg').trim());
    });

  }

  show() {
    this.root.removeAttribute('hidden');
  }

  hide() {
    this.root.setAttribute('hidden', true);
  }

}
