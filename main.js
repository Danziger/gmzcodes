
// VARIABLES:

// Canvas:

let scale = window.devicePixelRatio || 1;
let unit = 8;
let scaledUnit = unit * scale;
let color = 'black';
let drawing = false;
let lastX = null;
let lastY = null;
// let lastWidth = window.innerWidth;
// let lastHeight = window.innerHeight;
// let offsetLeft = (window.innerWidth % unit) / 2 | 0; // TODO: From the canvas container
// let offsetTop = (window.innerHeigh  % unit) / 2 | 0; // TODO: From the canvas container
let offsetLeft = 0;
let offsetTop = 0;
let isDesktop = false;
// let timeoutID = null;



// DOM Elements:

let body;
let header;
let warning;
let footer;
let colors;
let refresh;
let canvas;
let cursor;
let cursorIcon;
let cursorPosition;
let ctx;
let ruler;
let rulerX;
let rulerY;
let rulerButton;

// WELCOME MESSAGE FOR TECHIES:

console.log('Hello there 👋. Wanna play a game? 👉 https://danziger.github.io/slotjs/');


// SERVICE WORKER:

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      // console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, (err) => {
      // console.log('ServiceWorker registration failed... :( ', err);
    });
  });
}


// EVENTS:

document.addEventListener('DOMContentLoaded', () => {
  // Get all DOM references:

  body = document.body;
  header = document.getElementById('header');
  warning = document.getElementById('warning');
  footer = document.getElementById('footer');
  colors = document.getElementById('colors');
  refresh = document.getElementById('refresh');
  canvas = document.getElementById('canvas');
  cursor = document.getElementById('cursor');
  cursorIcon = document.getElementById('cursor-icon');
  cursorPosition = document.getElementById('cursor-position');
  ctx = canvas.getContext('2d');
  ruler = document.getElementById('ruler__root');
  rulerX = document.getElementById('ruler__x');
  rulerY = document.getElementById('ruler__y');
  rulerButton = document.getElementById('ruler__button');


  // Enable desktop functionality if not on mobile:

  if (!/Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isDesktop = true;

    body.classList.add('hover'); // TODO: Rename to hover-visible (and same for focus-visible).

    // TODO: Move focus-related events here (should work in NOT SUPPORTED page too).
  }

  // Check if the browser supports all the functionality we need:

  let supported = false;

  try {
    supported = !/MSIE|Trident/.test(window.navigator.userAgent) && window.CSS.supports('mix-blend-mode','multiply') && location.hash !== '#uncool';
  } catch (e) { /* NOT SUPPORTED */ }

  if (supported) {
    // TODO: Add animation to show footer:
    footer.removeAttribute('hidden');
    footer.removeAttribute('aria-hidden');
  } else {
    warning.removeAttribute('hidden');
    warning.removeAttribute('aria-hidden');

    header.setAttribute('hidden', true);
    header.setAttribute('aria-hidden', true);

    // Leave only 1 of the two Gran Torino images, randomly:

    const torinoImage = document.getElementById(`torino-${ Math.round(Math.random()) + 1 }`);

    if (torinoImage) torinoImage.remove();

    // Delete the custom cursor and re-enable the default cursor:

    if (cursor) cursor.remove();

    body.classList.add('fallback');
    
    return;
  }

  if (isDesktop) {
    // Populate rulers' scales:

    let rulerScaleX = '';
    let rulerScaleY = '';

    // Will work up  to 5K:
    for (let i = 0; i < 80; ++i) {
      rulerScaleX += `<span class="ruler__stepX">${ i * 8 }</span>`;
      rulerScaleY += `<span class="ruler__stepY">${ i * 8 }</span>`;
    }

    rulerX.innerHTML = rulerScaleX;
    rulerY.innerHTML = rulerScaleY;

    ruler.classList.add('visible');
  }

  // Init canvas size:

  canvas.setAttribute('width', window.innerWidth * scale);
  canvas.setAttribute('height', window.innerHeight * scale);

  // Add all events listeners:

  window.addEventListener('resize', handleResize);

  document.addEventListener('touchstart', handleTouchStart);
  document.addEventListener('mousedown', handleMouseDown);

  document.addEventListener('touchmove', handleMove);
  document.addEventListener('mousemove', handleMove);

  document.addEventListener('touchend', handleStopDrawing);
  document.addEventListener('touchcancel', handleStopDrawing);
  document.addEventListener('mouseup', handleStopDrawing);
  document.addEventListener('mouseleave', handleStopDrawing);

  document.addEventListener('contextmenu', handleContextMenu);

  if (isDesktop) {
    document.addEventListener('keydown', handleKeyDown);

    body.addEventListener('mouseenter', handleMouseEnter);
    body.addEventListener('mouseout', handleMouseOut);
    rulerButton.addEventListener('click', handleRulerToggled);
  }

  colors.addEventListener('click', handleColorSelected);
  refresh.addEventListener('click', resetCanvas);
});


// EVENT HANDLERS:

function handleResize() {
  // clearTimeout(timeoutID);
  
  resetCanvas();
  
  // timeoutID = setTimeout(resetCanvas, 500);
}

function handleTouchStart(e) {
  // TODO: Disable focus.

  drawing = true;
  lastX = Math.floor((e.pageX - offsetLeft) / unit);
  lastY = Math.floor((e.pageY - offsetTop) / unit);
  
  paintPixel(lastX, lastY);
}

function handleMouseDown(e) {
  // TODO: Disable focus.

  const { which, target } = e;
  
  if (colors.contains(target) || target === rulerButton) {
    return;
  }
  
  if (!header.contains(target)) {
    e.preventDefault();
  }
  
  if (which !== 2) {
    drawing = true;
    lastX = Math.floor((e.pageX - offsetLeft) / unit);
    lastY = Math.floor((e.pageY - offsetTop) / unit);
    
    ctx.fillStyle = which === 3 ? 'white' : color;
    
    paintPixel(lastX, lastY);
  }
}

function handleMove(e) {    
  const { pageX } = e.touches ? e.touches[0] : e;
  const { pageY } = e.touches ? e.touches[0] : e;
  
  const x = Math.floor((pageX - offsetLeft) / unit);
  const y = Math.floor((pageY - offsetTop) / unit);
  
  if (isDesktop) {
    requestAnimationFrame(() => {
      cursorPosition.innerText = `${ x + 1 } , ${ y + 1 }`;
      cursor.style.display = 'block';
      cursor.style.transform = `translate(${ x * unit + offsetLeft }px, ${ y * unit + offsetTop }px)`;

      if (drawing) return; 

      const { target } = e;
      const { tagName } = target;

      if (tagName === 'BUTTON' || tagName === 'A' || target.className === 'underline') {
        cursor.classList.add('clickable');
      } else {
        cursor.classList.remove('clickable');
      }
    });
  }
  
  if (drawing) {
    const w = Math.abs(x - lastX);
    const h = Math.abs(y - lastY);
    
    if (w === 0 && h === 0) {
      paintPixel(x, y);
    } else if (w > h) {
      lineLandscape(lastX, lastY, x, y);
    } else {
      linePortrait(lastX, lastY, x, y);
    }
    
    lastX = x;
    lastY = y;
  }
}

function handleStopDrawing(e) {
  drawing = false;
}

function handleContextMenu(e) {
  const { target } = e;
  
  if (!target || (target.tagName !== 'A' && target.parentElement.tagName !== 'A' && window.getSelection().toString() === '')) {
    e.preventDefault();
  }
}

function handleKeyDown({ key }) {
  // console.log(key);

  switch (key.toUpperCase()) {
    case 'TAB':
      body.classList.add('focus-visible');
      break;

    case 'ESCAPE':
      body.classList.remove('focus-visible');
      break;

    case 'DELETE':
      resetCanvas();
      break;

    /*

    case '+':
      unit = Math.min(unit + 8, 128);
      scaledUnit = unit * scale;

      const x = Math.floor((lastX - offsetLeft) / unit);
      const y = Math.floor((lastY - offsetTop) / unit);
      
      if (isDesktop) {
        requestAnimationFrame(() => {
          cursor.style.width = `${ unit }px`;
          cursor.style.height = `${ unit }px`;
          cursor.style.transform = `translate(${ x * unit + offsetLeft }px, ${ y * unit + offsetTop }px)`;
        });
      }

      break;

    case '-':
      unit = Math.max(unit - 8, 1);
      scaledUnit = unit * scale;
      lastX = Math.floor((lastX - offsetLeft) / unit);
      lastY = Math.floor((lastY - offsetTop) / unit);
      
      if (isDesktop) {
        requestAnimationFrame(() => {
          cursor.style.width = `${ unit }px`;
          cursor.style.height = `${ unit }px`;
          cursor.style.transform = `translate(${ lastX * unit + offsetLeft }px, ${ lastY * unit + offsetTop }px)`;
        });
      }

      break;

    */

    default: 
      const colorNumber = parseInt(key, 10);

      if (isNaN(colorNumber) || colorNumber <= 0 || colorNumber > colors.children.length - 1) return;

      colors.children[colorNumber - 1].children[0].click(); 
  }
}

function handleMouseEnter(e) {
  cursor.style.display = 'block';
}

function handleMouseOut(e) {
  if (!e.relatedTarget && !e.toElement) {
    cursor.style.display = 'none';
  }
}

function handleColorSelected({ target }) {
  if (!target.classList.contains('color__sample'))  return;

  const currentSample = document.querySelector('.color__sample--isCurrent');

  if (currentSample) currentSample.classList.remove('color__sample--isCurrent');

  target.classList.add('color__sample--isCurrent');

  ctx.fillStyle = color = window.getComputedStyle(target).getPropertyValue('--bg');
}

function handleRulerToggled() {
  ruler.classList.toggle('expanded');
}


// DRAWING FUNCTIONS:

function resetCanvas() {
  // if (lastWidth >= window.innerWidth && lastHeight >= window.innerHeight) {
  //   return;
  // }
  
  // const copyCanvas = document.createElement('canvas');
  
  // TODO: Take max between last and current width and height!
  
  // copyCanvas.setAttribute('width', lastWidth * scale);
  // copyCanvas.setAttribute('height', lastHeight * scale);  
  // copyCanvas.getContext('2d').drawImage(canvas, 0, 0);
  
  canvas.setAttribute('width', window.innerWidth * scale);
  canvas.setAttribute('height', window.innerHeight * scale);
  
  // ctx.drawImage(copyCanvas, Math.ceil((window.innerWidth - lastWidth) / 2), 0);
  
  // lastWidth = window.innerWidth;
  // lastHeight = window.innerHeight;
  // offsetLeft = (window.innerWidth % unit) / 2 | 0; // TODO: From the canvas container
  // offsetTop = (window.innerHeight % unit) / 2 | 0; // TODO: From the canvas container
}

function paintPixel(x, y) {
  ctx.fillRect(x * scaledUnit + offsetLeft, y * scaledUnit + offsetTop, scaledUnit, scaledUnit);
}

function lineLandscape(x0, y0, x1, y1) {
  if (x0 > x1) {
    [x0, x1] = [x1, x0];
    [y0, y1] = [y1, y0];
  }
  
  const dx = x1 - x0;
  const dy = Math.abs(y1 - y0);
  const yi = y0 > y1 ? -1 : 1;
  
  let D = 2 * dy - dx;  
  let y = y0;
  
  for (let x = x0; x <= x1; ++x) {
    paintPixel(x, y);
    
    if (D > 0) {
      y += yi;
      D -= 2 * dx;
    }
    
    D += 2 * dy;
  }
}

function linePortrait(x0, y0, x1, y1) {
  if (y0 > y1) {
    [x0, x1] = [x1, x0];
    [y0, y1] = [y1, y0];
  }
  
  const dx = Math.abs(x1 - x0);
  const dy = y1 - y0;
  const xi = x0 > x1 ? -1 : 1;
  
  let D = 2 * dx - dy;  
  let x = x0;
  
  for (let y = y0; y <= y1; ++y) {
    paintPixel(x, y);
    
    if (D > 0) {
      x += xi;
      D -= 2 * dy;
    }
    
    D += 2 * dx;
  }
}