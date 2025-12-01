// frontend/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import mkcert from 'vite-plugin-mkcert';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    mkcert(), // ← настоящий HTTPS-сертификат
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true }, // PWA работает даже в dev-режиме
      manifest: {
        name: 'Расчёт утеплителя',
        short_name: 'Утеплитель',
        theme_color: '#422711',
        background_color: '#f8f8f8',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/RIP-BMSTU-FRONTED/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/RIP-BMSTU-FRONTED/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: '/RIP-BMSTU-FRONTED/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      }
    })
  ],

  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
    },           // mkcert даёт валидный сертификат
    host: '0.0.0.0',     // слушает все интерфейсы → доступно по твоему IP
    port: 3000,
    strictPort: true,
    proxy: {
      '/api': {
          target: 'http://192.168.56.1:8000',
          changeOrigin: true,
          secure: false
        },
      '/insulation-image': {                   // ← если у тебя отдельный сервер картинок
        target: 'http://192.168.56.1:9000',   // или localhost:9000
        changeOrigin: true,
        secure: false
      }
    }
  },

  clearScreen: false
});