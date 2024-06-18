import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
  plugins: [
    react(), 
    VitePWA({ 
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      },
      /* If you want to check it on dev, add devOptions.
      */
      devOptions: {
        enabled: true
      },
      manifest:{
        "name": "Pedlyfe",
        "short_name": "Pedlyfe",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "lang": "en",
        "scope": "/",
        "theme_color": "#1066d8",
        "icons": [
          {
            "src": "/images/logo.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "/images/logo.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/images/logo.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/images/logo.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ],
        "id": "Pedlyfe@mindlyfe",
        "description": "This app connects mothers and doctors. Mothers can post there questions or image for more descriptions,then the fellow mother and doctors can respond to the question. They can still book appointments with the doctors and schedule meetings online or physical.",
        "dir": "auto",
        "categories": [
          "education",
          "fitness",
          "health",
          "lifestyle",
          "medical",
          "news",
          "personalization",
          "social"
        ],
        "display_override": [
          "fullscreen",
          "standalone",
          "window-controls-overlay"
        ]
      },
    })
  ],
})