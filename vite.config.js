import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { VitePWA } from 'vite-plugin-pwa';
import pkg from './package.json';
import childProcess from 'child_process';

const COMMIT_HASH = childProcess.execSync('git rev-parse HEAD').toString().trim();
const BUILD_DATE = new Date().toISOString();

export default defineConfig(({ mode }) => {
    const DEV = mode === 'development' || mode === 'development';
    const PROD = mode === 'production';

    return {
        publicDir: 'static',
        define: {
            'process.env.DEV': DEV,
            'process.env.PROD': PROD,
            'process.env.BUILD_DATE': JSON.stringify(BUILD_DATE),
            'process.env.COMMIT_HASH': JSON.stringify(COMMIT_HASH),
        },
        plugins: [
            ViteEjsPlugin({
                htmlWebpackPlugin: {
                    options: {
                        title: 'GMZcodes - Dani Gámez Franco',
                        description: 'Dani Gámez Franco - Staff Web3 Software Engineer / Architect - Summa Cum Laude Computer Science Engineer - Top 1.5% at StackOverflow - JS, TS, React, Next.js, Node.js, tRPC, Clean Software Architecture',
                    }
                }
            }),
            VitePWA({
                injectRegister: null, // the app registers the sw manually in main.js
                strategies: 'generateSW',
                filename: 'service-worker.js',
                outDir: 'dist',
                workbox: {
                    cleanupOutdatedCaches: true,
                    globIgnores: ['**/*.{png,jpg,jpeg,gif,svg,woff2}'],
                    additionalManifestEntries: [
                        { url: 'manifest.json', revision: null },
                        { url: 'dani-gamez-franco-cv-2026.02.11.pdf', revision: null },
                        { url: 'llms.txt', revision: null }
                    ],
                    runtimeCaching: [
                        {
                            urlPattern: /\.(?:png|jpg|jpeg|gif|svg|woff2)$/,
                            handler: 'CacheFirst',
                            options: {
                                cacheName: 'images',
                                expiration: {
                                    maxEntries: 16,
                                    maxAgeSeconds: 30 * 24 * 60 * 60,
                                },
                            },
                        },
                        {
                            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
                            handler: 'StaleWhileRevalidate',
                            options: {
                                cacheName: 'google-fonts-stylesheets',
                                expiration: {
                                    maxEntries: 4,
                                },
                            },
                        },
                        {
                            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
                            handler: 'CacheFirst',
                            options: {
                                cacheName: 'google-fonts-webfonts',
                                cacheableResponse: {
                                    statuses: [0, 200],
                                },
                                expiration: {
                                    maxEntries: 30,
                                    maxAgeSeconds: 60 * 60 * 24 * 365,
                                },
                            },
                        },
                    ],
                },
            }),
        ],
        build: {
            sourcemap: true,
            minify: true,
        }
    };
});
