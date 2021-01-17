export class Ruler {

  // CSS classes:
  static C_HAS_ACTIVE_RULER = 'app--hasActiveRuler'; // TODO: Rename

  // CSS selectors:
  static S_ROOT = '.ruler__root';
  static S_RULER_X = '.ruler__x';
  static S_RULER_Y = '.ruler__y';

  // Elements:
  body = document.body;
  ruler = document.querySelector(Ruler.S_ROOT);

  // State:
  isRulerActive = false;

  constructor() {
    const { ruler } = this;

    // Populate rulers' scales:
    let rulerScaleX = '';
    let rulerScaleY = '';

    // Will work up to 5K:
    for (let i = 0; i < 80; ++i) {
      rulerScaleX += `<span class="ruler__stepX">${ i * 8 }</span>`;
      rulerScaleY += `<span class="ruler__stepY">${ i * 8 }</span>`;
    }

    ruler.querySelector(Ruler.S_RULER_X).innerHTML = rulerScaleX;
    ruler.querySelector(Ruler.S_RULER_Y).innerHTML = rulerScaleY;
  }

  open() {
    if (this.isRulerActive) return;

    this.isRulerActive = true;
    this.body.classList.add(Ruler.C_HAS_ACTIVE_RULER);
    this.ruler.setAttribute('aria-hidden', false);
  }

  close() {
    if (!this.isRulerActive) return;

    this.isRulerActive = false;
    this.body.classList.remove(Ruler.C_HAS_ACTIVE_RULER);
    this.ruler.setAttribute('aria-hidden', true);
  }

}
