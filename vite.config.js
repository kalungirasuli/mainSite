import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        fileName: 'manifest.json',
      },
      workbox: {
        globPatterns: ['**/*'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            // Cache Firebase API responses
            urlPattern: new RegExp('^https://neonnate-e66bb.firebaseapp.com/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'firebase-api-cache',
            },
          },
          {
            // Cache images
            urlPattern: /\.(png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          // Add more runtime caching strategies as needed
        ],
      },
    }),
  ],
});
