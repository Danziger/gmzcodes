import { BodyState, setBodyState } from '../../body-state.js';
import { portfolioDom } from '../../portfolio-dom.js';
import rulerStyles from './ruler.module.scss';

export class Ruler {

  // Elements:
  body = document.body;
  ruler = document.querySelector(portfolioDom.ruler.root);

  // State:
  isRulerActive = false;

  constructor() {
    const { ruler } = this;

    let rulerScaleX = '';
    let rulerScaleY = '';

    for (let i = 0; i < 80; ++i) {
      rulerScaleX += `<span class="${ rulerStyles.stepX }">${ i * 8 }</span>`;
      rulerScaleY += `<span class="${ rulerStyles.stepY }">${ i * 8 }</span>`;
    }

    ruler.querySelector(portfolioDom.ruler.x).innerHTML = rulerScaleX;
    ruler.querySelector(portfolioDom.ruler.y).innerHTML = rulerScaleY;
  }

  open() {
    if (this.isRulerActive) return;

    this.isRulerActive = true;
    setBodyState(this.body, BodyState.RULER, true);
    this.ruler.setAttribute('aria-hidden', false);
  }

  close() {
    if (!this.isRulerActive) return;

    this.isRulerActive = false;
    setBodyState(this.body, BodyState.RULER, false);
    this.ruler.setAttribute('aria-hidden', true);
  }

}
