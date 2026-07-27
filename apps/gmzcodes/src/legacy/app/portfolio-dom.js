/** Stable DOM hooks for legacy portfolio JS (independent of hashed module classes). */
export const portfolioDom = {
  nav: {
    wand: '[data-portfolio="nav-wand"]',
    menuButton: '[data-portfolio="nav-menu-button"]',
    menuIcon: '[data-portfolio="nav-menu-icon"]',
    menu: '[data-portfolio="nav-menu"]',
    actions: '[data-portfolio="nav-action"], [data-portfolio="nav-github"]',
    logoLink: '[data-portfolio="nav-logo"]',
    vibration: '#vibration',
    sound: '#sound',
    fileInput: '[data-portfolio="nav-file-input"]',
  },
  content: {
    root: '[data-portfolio="content-root"]',
    regularHeader: '[data-portfolio="content-regular-header"]',
    warningHeader: '[data-portfolio="content-warning-header"]',
    videoPlaceholder: '[data-portfolio="content-video-placeholder"]',
    videoDescription: '[data-portfolio="content-video-description"]',
  },
  footer: {
    root: '[data-portfolio="footer-root"]',
    colors: '[data-portfolio="footer-colors"]',
    hiring: '[data-portfolio="footer-hiring"]',
    attribution: '[data-portfolio="footer-attribution"]',
    attributionByName: '[data-portfolio="footer-attribution-name"]',
    attributionSurname: '[data-portfolio="footer-attribution-surname"]',
  },
  jsPaint: {
    canvas: '[data-portfolio="js-paint-canvas"]',
  },
  ruler: {
    root: '[data-portfolio="ruler-root"]',
    x: '[data-portfolio="ruler-x"]',
    y: '[data-portfolio="ruler-y"]',
  },
  cursor: {
    root: '[data-portfolio="cursor-root"]',
    position: '[data-portfolio="cursor-position"]',
  },
  dropZone: {
    root: '[data-portfolio="drop-zone-root"]',
    error: '[data-portfolio="drop-zone-error"]',
    closeError: '[data-portfolio="drop-zone-close"]',
  },
  link: {
    underline: '[data-portfolio="link-underline"]',
  },
};
