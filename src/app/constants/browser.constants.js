export const HAS_TOUCH = navigator.maxTouchPoints > 0
  || 'ontouchstart' in window
  || (window.DocumentTouch && document instanceof window.DocumentTouch);

let hasHoverFlag = false;

try {
  hasHoverFlag = window.matchMedia('(any-hover: hover)').matches;
} catch (err) {
  hasHoverFlag = !HAS_TOUCH;
}

export const HAS_HOVER = hasHoverFlag;

export const IS_DESKTOP
  = !navigator.userAgentData?.mobile;
  // = !/Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const supportsCSS = (window.CSS && window.CSS.supports) || (() => false);

const isUncoolBrowser = /MSIE|Trident/.test(navigator.userAgent);

const supportsCSSMixBlendMode = supportsCSS('mix-blend-mode', 'multiply');

const supportsCSSCustomProperties = supportsCSS('color', 'var(--fake-var)');

export const IS_BROWSER_SUPPORTED = (supportsCSSMixBlendMode && supportsCSSCustomProperties) || !isUncoolBrowser;
