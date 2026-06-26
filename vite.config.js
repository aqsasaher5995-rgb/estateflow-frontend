import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cloudflare()],
  server: {
    proxy: {
      '/api': {
        target: 'https://estateflow-backend-mt7ox7s2k-aqsasaher5995-rgbs-projects.vercel.app',
        changeOrigin: true,
        secure: true,
      }
    }
  }
});