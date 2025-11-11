import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/RIP-BMSTU-FRONTED",
  server: {
    proxy: {
      '/api': 'http://localhost:8000',           // ← твой Django
      '/insulation-image': 'http://localhost:9000', // ← MinIO
    },
  },
});