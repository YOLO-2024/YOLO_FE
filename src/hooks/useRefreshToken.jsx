import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { accessTokenState, refreshTokenState } from '../state/AuthState';

export const useAuthInterceptor = () => {
  const setAccessToken = useSetRecoilState(accessTokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);

  const setupInterceptors = () => {
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const { data } = await axios.post(
              `${import.meta.env.VITE_CLIENT_URL}/api/v1/auth/access`,
              {
                refreshToken: localStorage.getItem('refreshToken'), // 여기를 Recoil 상태로 대체하고 싶다면, 초기 로딩 시 로컬 스토리지에서 상태로 동기화하는 로직이 필요합니다.
              },
            );
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
            axios.defaults.headers.common['Authorization'] =
              `Bearer ${data.accessToken}`;
            return axios(originalRequest);
          } catch (_error) {
            // 토큰 재발급 실패 처리
            console.log('토큰 재발급 실패');
          }
        }
        return Promise.reject(error);
      },
    );
  };

  return setupInterceptors;
};
