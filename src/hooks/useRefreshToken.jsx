/*
import axios from 'axios';
import { accessTokenState, refreshTokenState } from '../state/AuthState'; // 상태 관리 로직은 적절히 조정하세요
import { useRecoilValue, useSetRecoilState } from 'recoil';

export default function useRefreshToken() {
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
          axios.defaults.headers.common['Authorization'] =
            `Bearer ${accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

          // 원래 요청을 새 액세스 토큰으로 재시도
          return axios(originalRequest);
        }
        return Promise.reject(error);
      },
    );
  return;
}
*/
