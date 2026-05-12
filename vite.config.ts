import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Αρχεία που θα περιλαμβάνονται στο precache
      includeAssets: ['favicon.svg', 'icons.svg', 'images/KCHC.jpg'],
      manifest: {
        name: 'KCHC Web App',
        short_name: 'KCHC',
        description: 'Katerini City Hard Core Web App',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'images/KCHC.jpg',
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: 'images/KCHC.jpg',
            sizes: '512x512',
            type: 'image/jpeg'
          }
        ]
      }
    })
  ],
})
