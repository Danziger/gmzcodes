import { App } from './legacy/app/components/app/app.component';

console.log('Hello there 👋. Wanna play a game? 👉 https://danziger.github.io/slotjs/');

const app = new App();

window.enableScreenshotMode = () => app.enableScreenshotMode();
window.disableScreenshotMode = () => app.disableScreenshotMode();

window.v = () => {
  const buildDate = new Date(process.env.BUILD_DATE as string);
  return `${buildDate.toDateString()} at ${buildDate.toLocaleTimeString()} | ${process.env.COMMIT_HASH}`;
};

if (visualViewport) {
  const updateViewportDimensions = () => {
    if (visualViewport) {
      document.documentElement.style.setProperty('--viewportHeight', `${visualViewport.height}px`);
    }
  };

  updateViewportDimensions();
  visualViewport.addEventListener('resize', updateViewportDimensions);
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    if (import.meta.env.DEV) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        console.log(`Unregistering all ${registrations.length} ServiceWorkers`);
        registrations.forEach((registration) => registration.unregister());
      });
      return;
    }

    navigator.serviceWorker.register('/service-worker.js');
  });
}
