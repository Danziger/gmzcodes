export const HAS_TOUCH = navigator.maxTouchPoints > 0
  || 'ontouchstart' in window
  || (window.DocumentTouch && document instanceof window.DocumentTouch);

export const IS_DESKTOP
  = !/Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const supportsCSS = (window.CSS && window.CSS.supports) || (() => false);

const isUncoolBrowser = /MSIE|Trident/.test(window.navigator.userAgent);

const supportsCSSMixBlendMode = supportsCSS('mix-blend-mode', 'multiply');

const supportsCSSCustomProperties = supportsCSS('color', 'var(--fake-var)');

export const IS_BROWSER_SUPPORTED = (supportsCSSMixBlendMode && supportsCSSCustomProperties) || !isUncoolBrowser;
