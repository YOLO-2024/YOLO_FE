import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_ENDPOINT,
          changeOrigin: true,
          rewrite: (path) => path.replace(/\/$/, ''), // 맨 뒤에 있는 '/'를 제거합니다.
          secure: false, // SSL 검증을 비활성화할 수 있습니다.
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
