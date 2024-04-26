import axios from 'axios';
import { tokenState } from '../utils/recoilState';

const Apis = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINT,
});

const addTokenToRequest = (config, accessToken) => {
  if (!accessToken) {
    config.headers['accessToken'] = null;
  } else {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
};

const handleUnauthorizedError = async (err, setToken) => {
  const originalConfig = err.config;

  if (err.response && err.response.status === 401) {
    try {
      const refreshToken = originalConfig.headers['refreshToken'];
      const response = await axios.post('/api/v1/auth/access', {
        refreshToken,
      });

      if (response && response.data) {
        setToken(response.data);
        // Retry original request after token refresh
        return axios(originalConfig);
      }
    } catch (error) {
      console.log('토큰 갱신 에러', error);
    }
  }
  return Promise.reject(err);
};

// 인터셉터 초기화 함수
export const initializeInterceptors = (setToken) => {
  Apis.interceptors.request.use((config) => {
    const { accessToken } = tokenState; // Recoil 상태에서 토큰 가져오기
    return addTokenToRequest(config, accessToken);
  });

  Apis.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return handleUnauthorizedError(error, setToken);
    },
  );
};

export default Apis;
