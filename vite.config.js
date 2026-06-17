import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://estateflow-backend-mt7ox7s2k6wllj-aqsasaher5995-rgbs-projects.vercel.app',
        changeOrigin: true,
        secure: true,
      }
    }
  }
});