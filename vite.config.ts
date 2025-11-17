import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import mkcert from 'vite-plugin-mkcert';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  base: '/RIP-BMSTU-FRONTED/',
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
    },
    host: true, // важно! чтобы был доступен по IP
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/insulation-image': {
        target: 'http://localhost:9000',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      manifest: {
        name: 'Расчёт утеплителя',
        short_name: 'Утеплитель',
        start_url: '/RIP-BMSTU-FRONTED/',
        display: 'standalone',
        background_color: '#422711',
        theme_color: '#422711',
        icons: [
          {
            src: '/RIP-BMSTU-FRONTED/logo192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/RIP-BMSTU-FRONTED/logo512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});