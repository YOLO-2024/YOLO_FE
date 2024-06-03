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
  function (response) {
    return response;
  },
  async function (err) {
    const originalConfig = err.config;
    let refreshTokenReqDto = {
      refreshToken: sessionStorage.getItem('refreshToken'),
    };
    if (err.response && err.response.status === 401) {
      try {
        const response = await axios.post(
          import.meta.env.VITE_ENDPOINT + '/api/v1/auth/access',
          refreshTokenReqDto,
        );
        if (response) {
          sessionStorage.setItem('accessToken', response.data.data.accessToken);
          sessionStorage.setItem(
            'refreshToken',
            response.data.data.refreshToken,
          );

          return await api.request(originalConfig);
        }
      } catch (err) {
        console.error(err);
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  },
);

export default api;
