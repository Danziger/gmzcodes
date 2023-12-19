export class Footer {

  // CSS selectors:
  static S_ROOT = '.footer__root';
  static S_COLORS = '.footer__colors';
  static S_CURRENT = '.footer__sample--isCurrent';
  static S_HIRING = '.footer__hiring';
  static S_ATTRIBUTION = '.footer__attribution';
  static S_ATTRIBUTION_BY_NAME = '.footer__attributionByName';
  static S_ATTRIBUTION_SURNAME = '.footer__attributionSurname';

  // CSS classes:
  static C_SAMPLE = 'footer__sample';
  static C_CURRENT = 'footer__sample--isCurrent';

  // Elements:
  root = document.querySelector(Footer.S_ROOT);
  colors = document.querySelector(Footer.S_COLORS);
  hiring = document.querySelector(Footer.S_HIRING);
  attribution = document.querySelector(Footer.S_ATTRIBUTION);
  attributionByName = document.querySelector(Footer.S_ATTRIBUTION_BY_NAME);
  attributionSurname = document.querySelector(Footer.S_ATTRIBUTION_SURNAME);

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

  showAttribution({
    name,
    surname,
    websiteURL,
  }) {
    this.attributionByName.textContent = `By ${ name }`;
    this.attributionSurname.textContent = surname;
    this.attribution.href = websiteURL;

    this.hiring.setAttribute('hidden', true);
    this.attribution.removeAttribute('hidden');
  }

  hideAttribution() {
    this.hiring.removeAttribute('hidden');
    this.attribution.setAttribute('hidden', true);
  }

}
