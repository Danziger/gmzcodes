export const HAS_TOUCH = navigator.maxTouchPoints > 0
  || 'ontouchstart' in window
  || (window.DocumentTouch && document instanceof window.DocumentTouch);

export const IS_DESKTOP
  = !/Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export const IS_MIX_BLEND_MODE_SUPPORTED = !/MSIE|Trident/.test(window.navigator.userAgent)
  && window.CSS && window.CSS.supports && window.CSS.supports('mix-blend-mode', 'multiply');
