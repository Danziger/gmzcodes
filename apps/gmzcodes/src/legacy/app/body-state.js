/** Body-level UI state flags (used by SCSS modules via data attributes). */
export const BodyState = {
  HOVER: 'app-hover',
  FOCUS: 'app-focus',
  RULER: 'app-ruler',
  FALLBACK: 'app-fallback',
  SCREENSHOT: 'app-screenshot',
};

export function setBodyState(body, flag, enabled) {
  const attr = `data-${flag}`;

  if (enabled) {
    body.setAttribute(attr, '');
  } else {
    body.removeAttribute(attr);
  }
}

export function hasBodyState(body, flag) {
  return body.hasAttribute(`data-${flag}`);
}
