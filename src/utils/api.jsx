import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_CLIENT_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  function (config) {
    const access_Token = sessionStorage.getItem('accessToken');
    if (access_Token) {
      config.headers.Authorization = `Bearer ${access_Token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    // 이미 재요청을 시도했다면 무한 루프를 막기 위해 바로 에러 전파
    if (originalConfig._retry) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true; // 재시도 했다는 표시 추가

      try {
        const refresh_Token = sessionStorage.getItem('refreshToken');
        // 서버로부터 새로운 accessToken
        const { data } = await axios.post('/api/v1/auth/refresh', {
          refresh_Token,
        });
        const newAccessToken = data.accessToken;

        // 새로운 AccessToken을 세션 스토리지와 요청 헤더에 설정
        sessionStorage.setItem('accessToken', newAccessToken);
        api.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // 새로운 토큰으로 재시도
        return api(originalConfig);
      } catch (err) {
        console.error('Unable to refresh token', err);
        sessionStorage.clear(); // 세션 스토리지 클리어
        window.location.href = '/login'; // 로그인 페이지로 이동
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
