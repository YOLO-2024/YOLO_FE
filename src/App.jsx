import { RouterProvider } from 'react-router-dom';
import router from './router/Router';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </>
  );
}

export default App;

/*
import axios from 'axios';
import { accessTokenState, refreshTokenState } from '../state/AuthState'; // 상태 관리 로직은 적절히 조정하세요
import { useRecoilValue, useSetRecoilState } from 'recoil';

axios.create({
  baseURL: import.meta.env.VITE_CLIENT_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
  redirect: 'follow',
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshTokens = useRecoilValue(refreshTokenState); // Recoil에서 리프레시 토큰 가져오기
      const response = await axios.post(
        `${import.meta.env.VITE_CLIENT_URL}/api/v1/auth/access`,
        {
          refreshToken: refreshTokens,
        },
      );

      const { accessToken } = response.data.data.token;
      const setAccessToken = useSetRecoilState(accessTokenState);
      setAccessToken(accessToken); // 새 액세스 토큰으로 상태 업데이트

      // 요청 헤더에 새 액세스 토큰 설정
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

      // 원래 요청을 새 액세스 토큰으로 재시도
      return axios(originalRequest);
    }
    return Promise.reject(error);
  },
);

*/
