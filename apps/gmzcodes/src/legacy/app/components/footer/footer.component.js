import { portfolioDom } from '../../portfolio-dom.js';
import { AppActions } from '../app/app.constants';
import footerStyles from './footer.module.scss';

export class Footer {

  // Elements:
  root = document.querySelector(portfolioDom.footer.root);
  colors = document.querySelector(portfolioDom.footer.colors);
  hiring = document.querySelector(portfolioDom.footer.hiring);
  attribution = document.querySelector(portfolioDom.footer.attribution);
  attributionByName = document.querySelector(portfolioDom.footer.attributionByName);
  attributionSurname = document.querySelector(portfolioDom.footer.attributionSurname);

  // Callback:
  onAction;

  constructor({ onAction }) {
    this.onAction = onAction;

    if (onAction) {
      this.addEventListeners();
      this.show();
    } else {
      this.hide();
    }
  }

  addEventListeners() {
    this.colors.addEventListener('click', ({ target }) => {
      if (!target.classList.contains(footerStyles.sample)) return;

      const currentSample = this.colors.querySelector(`.${ footerStyles.sampleCurrent }`);

      if (currentSample) currentSample.classList.remove(footerStyles.sampleCurrent);

      target.classList.add(footerStyles.sampleCurrent);

      this.onAction(AppActions.CHANGE_COLOR, window.getComputedStyle(target).getPropertyValue('--bg').trim());
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
