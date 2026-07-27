import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';
import react from '@vitejs/plugin-react';
import { execSync } from 'node:child_process';

const COMMIT_HASH = (() => {
  try {
    return execSync('git rev-parse HEAD').toString().trim();
  } catch {
    return 'unknown';
  }
})();

const BUILD_DATE = new Date().toISOString();

export default defineConfig({
  site: 'https://gmzcodes.com',
  output: 'static',
  outDir: './dist',
  integrations: [
    AstroPWA({
      registerType: 'autoUpdate',
      manifest: false,
      workbox: {
        cleanupOutdatedCaches: true,
        globIgnores: ['**/*.{png,jpg,jpeg,gif,svg,woff2}'],
        additionalManifestEntries: [
          { url: 'manifest.json', revision: null },
          { url: 'dani-gamez-franco-cv-2026.02.11.pdf', revision: null },
          { url: 'llms.txt', revision: null },
        ],
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|gif|svg|woff2)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: { maxEntries: 16, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
          },
        ],
      },
    }),
  ],
  vite: {
    plugins: [react()],
    define: {
      'process.env.DEV': 'import.meta.env.DEV',
      'process.env.PROD': 'import.meta.env.PROD',
      'process.env.BUILD_DATE': JSON.stringify(BUILD_DATE),
      'process.env.COMMIT_HASH': JSON.stringify(COMMIT_HASH),
    },
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: ['src/legacy/app'],
        },
      },
    },
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
  },
});
