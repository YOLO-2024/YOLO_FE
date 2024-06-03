import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = mode === 'production' ? 'production' : 'development';
  const VITE_ENDPOINT =
    env === 'production'
      ? import.meta.env.VITE_ENDPOINT
      : 'http://localhost:3000';

  return {
    plugins: [react()],
    server: {
      host: 'http://localhost:3000',
      port: 3000,
      proxy: {
        '/api': {
          target: VITE_ENDPOINT,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      minify: false,
    },
  };
});
