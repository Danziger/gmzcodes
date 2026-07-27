export function waitOneFrame() {
  return new Promise((resolve) => {
    window.requestAnimationFrame(resolve);
  });
}
