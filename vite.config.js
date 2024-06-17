import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
  plugins: [
    react(), 
    VitePWA({ 
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Neonates',
        short_name: 'Neonates',
        theme_color: '#ffffff',
        icons: [
            {
                src: './images/logo.png',
                sizes: '64x64',
                type: 'image/png'
            },
            {
                src: './images/logo.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: './images/logo.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: './images/logo.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            }
        ],
      }, 
    })
  ],
})