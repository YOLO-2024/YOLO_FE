import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_ENDPOINT,
          changeOrigin: true,
          rewrite: (path) => path.replace(/\/$/, ''),
          secure: false,
        },
      },
    },
    build: {
      minify: false,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };
});
