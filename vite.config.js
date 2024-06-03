import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const VITE_NEW_ENDPOINT = 'http://localhost:3000';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3000,
    proxy: {
      '/api': {
        target: VITE_NEW_ENDPOINT,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    minify: false,
  },
});
