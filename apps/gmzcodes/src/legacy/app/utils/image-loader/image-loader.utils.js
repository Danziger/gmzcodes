export function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();

    img.src = src;

    img.onload = () => {
      const canvas = document.createElement('CANVAS');
      const ctx = canvas.getContext('2d');

      const imageWidth = canvas.width = img.width;
      const imageHeight = canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, imageWidth, imageHeight).data;

      const getPixelColor = (x, y) => {
        const pixel = imageWidth * y + x;
        const position = pixel * 4;
        const R = imgData[position];
        const G = imgData[position + 1];
        const B = imgData[position + 2];

        // eslint-disable-next-line no-mixed-operators
        return `#${ (1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1) }`.toUpperCase();
      };

      resolve({
        imageWidth,
        imageHeight,
        getPixelColor,
      });
    };
  });
}
