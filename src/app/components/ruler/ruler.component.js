export class Ruler {

  // CSS classes:
  static C_IS_VISIBLE = 'ruler--isVisible';

  // CSS selectors:
  static S_ROOT = '.ruler__root';
  static S_RULER_X = '.ruler__x';
  static S_RULER_Y = '.ruler__y';
  static S_BUTTON = '.ruler__button';

  // Elements:
  root = document.querySelector(Ruler.S_ROOT);
  button = document.querySelector(Ruler.S_BUTTON);

  // State:
  isRulerActive = false;

  // Callbacks:
  onRulerToggled;

  constructor(onRulerToggled) {
    const { root } = this;

    if (!onRulerToggled) {
      return;
    }

    // Populate rulers' scales:

    let rulerScaleX = '';
    let rulerScaleY = '';

    // Will work up to 5K:
    for (let i = 0; i < 80; ++i) {
      rulerScaleX += `<span class="ruler__stepX">${ i * 8 }</span>`;
      rulerScaleY += `<span class="ruler__stepY">${ i * 8 }</span>`;
    }

    root.querySelector(Ruler.S_RULER_X).innerHTML = rulerScaleX;
    root.querySelector(Ruler.S_RULER_Y).innerHTML = rulerScaleY;

    root.removeAttribute('hidden');
    root.classList.add(Ruler.C_IS_VISIBLE);

    this.button.addEventListener('click', () => {
      const isRulerActive = this.isRulerActive = !this.isRulerActive;

      onRulerToggled(isRulerActive);

      // TODO: aria-hidden should go in the children, not in the root!

      /*
      if (isRulerActive) {
        this.root.removeAttribute('aria-hidden');
      } else {
        this.root.setAttribute('aria-hidden', true);
      }
      */

    });
  }

}
