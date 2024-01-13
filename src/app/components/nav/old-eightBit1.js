function eightBit1(img, pixelSize) {
  const scale = window.devicePixelRatio || 1;
  // const scale = 1;

  const mainCanvas = document.querySelector('.jsPaint__root');
  const mainCtx = mainCanvas.getContext('2d');

  const canvas = document.createElement('CANVAS');
  const ctx = canvas.getContext('2d');

  const canvasWidth = window.innerWidth * scale;
  const canvasHeight = window.innerHeight * scale;
  const canvasRatio = canvasHeight / canvasWidth;

  canvas.setAttribute('width', canvasWidth);
  canvas.setAttribute('height', canvasHeight);

  const imageWidth = img.width;
  const imageHeight = img.height;
  const imageRatio = imageHeight / imageWidth;

  const scaledWidth = imageWidth / pixelSize;
  const scaledHeight = imageHeight / pixelSize;

  let resizedWidth = 0;
  let resizedHeight = 0;

  if (canvasRatio > imageRatio) {
    // Image is wider than canvas, so:
    // - img.height = canvas.height to cover
    // - img.width = canvas.width to contain

    resizedWidth = canvasHeight / imageRatio;
    resizedHeight = canvasHeight;
  } else {
    // Image is taller than canvas, so we need to:
    // - img.width = canvas.width to cover
    // - img.height = canvas.height to contain

    resizedWidth = canvasWidth;
    resizedHeight = imageRatio / canvasWidth;
  }

  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;

  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

  ctx.drawImage(
    canvas,
    0,
    0,
    scaledWidth,
    scaledHeight,
    0,
    0,
    // resizedWidth,
    // resizedHeight,
    (resizedWidth / pixelSize),
    (resizedHeight / pixelSize),
  );

  console.log(`CANVAS = ${ canvasWidth } x ${ canvasHeight }`);
  console.log(`RESIZED IMAGE = ${ resizedWidth } x ${ resizedHeight }`);

  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = `${ canvasWidth }px`;
  canvas.style.height = `${ canvasHeight }px`;
  canvas.style.zIndex = 999999;

  document.body.appendChild(canvas);

  /*
      mainCtx.scale(window.devicePixelRatio, window.devicePixelRatio);

      mainCtx.drawImage(
        canvas,
        0,
        0,
      );

      mainCtx.scale(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);
      */

  // mainCtx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight);
}


// WORKS WHEN ADJUSTING FOR PIXEL DENSITY:


function eightBit2(img, pixelSize) {
  const adjustToDevice = true;

  const scale = adjustToDevice ? (window.devicePixelRatio || 1) : 1;

  const imageWidth = img.width;
  const imageHeight = img.height;

  const canvas = document.createElement('CANVAS');
  const ctx = canvas.getContext('2d');

  const canvasWidth = imageWidth / scale;
  const canvasHeight = imageHeight / scale;

  const scaledImageWidth = canvasWidth / pixelSize;
  const scaledImageHeight = canvasHeight / pixelSize;

  canvas.setAttribute('width', canvasWidth);
  canvas.setAttribute('height', canvasHeight);

  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;

  // ctx.scale(scale, scale);

  // ctx.drawImage(img, 0, 0);

  ctx.drawImage(img, 0, 0, imageWidth, imageHeight, 0, 0, scaledImageWidth, scaledImageHeight);
  ctx.drawImage(canvas, 0, 0, scaledImageWidth, scaledImageHeight, 0, 0, canvasWidth, canvasHeight);

  /*
      ctx.drawImage(
        canvas,
        0,
        0,
        scaledWidth,
        scaledHeight,
        0,
        0,
        // resizedWidth,
        // resizedHeight,
        (resizedWidth / pixelSize),
        (resizedHeight / pixelSize),
      );
      */

  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = `${ canvasWidth }px`;
  canvas.style.height = `${ canvasHeight }px`;
  canvas.style.zIndex = 999999;
  canvas.style.imageRendering = 'pixelated';

  // document.body.appendChild(canvas);

  const mainCanvas = document.querySelector('.jsPaint__root');
  const mainCtx = mainCanvas.getContext('2d');

  mainCtx.mozImageSmoothingEnabled = false;
  mainCtx.webkitImageSmoothingEnabled = false;
  mainCtx.imageSmoothingEnabled = false;

  mainCtx.scale(scale, scale);
  mainCtx.drawImage(canvas, 0, 0, imageWidth, imageHeight, 0, 0, imageWidth * scale, imageHeight * scale);

  /*
      mainCtx.scale(window.devicePixelRatio, window.devicePixelRatio);

      mainCtx.drawImage(
        canvas,
        0,
        0,
      );

      mainCtx.scale(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);
      */

  // mainCtx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight);
}

