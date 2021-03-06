import { Ruler } from '../ruler/ruler.component';
import { JsPaint } from '../js-paint/js-paint.component';
import { IS_DESKTOP, IS_BROWSER_SUPPORTED, HAS_TOUCH } from '../../constants/browser.constants';
import { Cursor } from '../cursor/cursor.component';
import { Footer } from '../footer/footer.component';
import { initializeLinks } from '../link/link.utils';
import { TORINO_VIDEOS } from '../torino/torino.constants';

export class App {

  // CSS classes:
  static C_HAS_ACTIVE_FOCUS = 'app--hasActiveFocus';
  static C_HAS_ACTIVE_HOVER = 'app--hasActiveHover';
  static C_HAS_ACTIVE_RULER = 'app--hasActiveRuler';
  static C_SHOW_FALLBACK = 'app--showFallback';
  static C_SHOW_SCREENSHOT = 'app--showScreenshot';

  // Elements:
  root = document.body;

  // Components:
  footer = null;
  jsPaint = null;
  ruler = null;
  cursor = null;

  constructor() {
    const { root } = this;

    let focusActive = false;

    if (IS_DESKTOP) {
      const disableFocus = () => {
        focusActive = false;
        root.classList.remove(App.C_HAS_ACTIVE_FOCUS);
      };

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && !focusActive) {
          focusActive = true;
          root.classList.add(App.C_HAS_ACTIVE_FOCUS);
        } else if (e.key === 'Escape' && focusActive) {
          disableFocus();
        }
      });

      document.addEventListener('mousedown', disableFocus);
      document.addEventListener('touchstart', disableFocus);
    }

    if (IS_BROWSER_SUPPORTED) {
      initializeLinks();
    }

    if (IS_BROWSER_SUPPORTED && window.location.hash !== '#uncool') {
      this.init();
    } else {
      this.showFallback();
    }
  }

  init() {
    const { root } = this;

    if (!HAS_TOUCH) {
      this.root.classList.add(App.C_HAS_ACTIVE_HOVER);

      this.cursor = new Cursor();
    }

    this.ruler = new Ruler((isRulerActive) => {
      if (isRulerActive) {
        root.classList.add(App.C_HAS_ACTIVE_RULER);
      } else {
        root.classList.remove(App.C_HAS_ACTIVE_RULER);
      }
    });

    const jsPaint = this.jsPaint = new JsPaint({
      cursor: this.cursor,
    });

    this.footer = new Footer((action) => {
      if (action[0] === '#') {
        jsPaint.setColor(action);

        root.style.setProperty('--c-current', action);
      } else if (action === 'reset') {
        jsPaint.reset();
      }
    });
  }

  showFallback() {
    if (!HAS_TOUCH) {
      this.root.classList.add(App.C_HAS_ACTIVE_HOVER);
    }

    this.root.classList.add(App.C_SHOW_FALLBACK);

    // Show the right title:
    document.querySelector('.content__regularHeader').setAttribute('hidden', true);
    document.querySelector('.content__regularHeader').setAttribute('aria-hidden', true);
    document.querySelector('.content__warningHeader').removeAttribute('hidden');
    document.querySelector('.content__warningHeader').removeAttribute('aria-hidden');

    // Load one video:
    const torinoVideo = TORINO_VIDEOS[Math.floor(Math.random() * TORINO_VIDEOS.length)];

    document.querySelector('.content__videoPlaceholder').innerHTML = `
      <video class="content__video" loop autoplay muted playsinline>
        <source src="${ torinoVideo.src }" type="video/mp4" />
      </video>
    `;

    const videoDescriptionElement = document.querySelector('.content__videoDescription');

    videoDescriptionElement.innerHTML = videoDescriptionElement.innerHTML.replace(/^Scene/, torinoVideo.description);

    // Hide ruler:
    this.ruler = new Ruler(false);

    // Hide footer:
    this.footer = new Footer(false);

    // Show the right URL:
    if (window.location.hash !== '#uncool') window.location.replace('#uncool');
  }

  enableScreenshotMode() {
    this.root.classList.add(App.C_SHOW_SCREENSHOT);
  }

  disableScreenshotMode() {
    this.root.classList.remove(App.C_SHOW_SCREENSHOT);
  }

}
