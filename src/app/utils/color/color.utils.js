export function componentToHex(c) {
  const hex = c.toString(16);

  return hex.length === 1 ? `0${ hex }` : hex;
}

export function rgbToHex(r, g, b) {
  return `#${ componentToHex(r) }${ componentToHex(g) }${ componentToHex(b) }`.toUpperCase();
}
