const S_LINK_UNDERLINE = '.link__underline';
const C_LINK_UNDERLINE = 'link__underline';
const C_LINK_EFFECT = 'link__underline';
const MIN_LINK_EFFECT_WIDTH = 10;
const MAX_LINK_EFFECT_WIDTH = 60;
const MIN_RERANDOMIZE_DELAY = 250;
const MAX_RERANDOMIZE_DELAY_INCREMENT = 750;

function randomizeLinkEffect(linkRoot) {
  let w1 = Math.round(Math.random() * MAX_LINK_EFFECT_WIDTH);
  let w2 = Math.round(Math.random() * MAX_LINK_EFFECT_WIDTH);
  let w3 = Math.round(Math.random() * MAX_LINK_EFFECT_WIDTH);

  const x1 = Math.round(Math.random() * (100 - w1));
  const x2 = Math.round(Math.random() * (100 - w2));
  const x3 = Math.round(Math.random() * (100 - w3));

  w1 = w1 < MIN_LINK_EFFECT_WIDTH ? 0 : w1;
  w2 = w2 < MIN_LINK_EFFECT_WIDTH ? 0 : w2;
  w3 = w3 < MIN_LINK_EFFECT_WIDTH ? 0 : w3;

  linkRoot.style = `--x-1: ${ x1 }%; --w-1: ${ w1 }%; --x-2: ${ x2 }%; --w-2: ${ w2 }%; --x-3: ${ x3 }%; --w-3: ${ w3 }%;`;
}

const timeoutIDs = {};

function reRandomizeLinkEffect(currentTarget) {
  window.clearTimeout(timeoutIDs[currentTarget]);

  timeoutIDs[currentTarget] = setTimeout(() => {
    randomizeLinkEffect(currentTarget);
    reRandomizeLinkEffect(currentTarget);
  }, MIN_RERANDOMIZE_DELAY + Math.random() * MAX_RERANDOMIZE_DELAY_INCREMENT);
}

export function initializeLinks() {
  Array.from(document.querySelectorAll(S_LINK_UNDERLINE)).forEach((linkUnderline) => {
    const linkRoot = linkUnderline.parentElement;

    randomizeLinkEffect(linkRoot);

    linkRoot.onmouseenter = ({ currentTarget }) => reRandomizeLinkEffect(currentTarget);

    // Links that have some custom classes like the one inside nav are not cloned automatically here:
    if (linkUnderline.className !== C_LINK_UNDERLINE) return;

    const linkEffect = linkUnderline.cloneNode(true);

    linkEffect.className = 'link__linkEffect';
    linkEffect.setAttribute(C_LINK_EFFECT, true);

    linkRoot.appendChild(linkEffect);
  });
}
