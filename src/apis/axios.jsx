import axios from 'axios';

const Apis = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINT,
});

//요청시 AccessToken 계속 보내주기
Apis.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem('accessToken');
  if (!token) {
    config.headers['accessToken'] = null;
    return config;
  }
  if (config.headers && token) {
    const accessToken = token;
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  }
});

//AccessToken이 만료됐을때 처리
Apis.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (err) {
    const originalConfig = err.config;

    if (err.response) {
      try {
        const response = await axios.post(
          import.meta.env.VITE_ENDPOINT + '/api/v1/auth/access',
          {
            refreshToken: 'Bearer ' + sessionStorage.getItem('refreshToken'),
          },
        );
        if (response) {
          sessionStorage.setItem('accessToken', response.data.data.accessToken);
          sessionStorage.setItem(
            'refreshToken',
            response.data.data.refreshToken,
          );
          return await Apis.request(originalConfig);
        }
      } catch (err) {
        console.error(err);
        console.log('토큰 갱신 에러');
        redirectToLogin(); // 토큰 재발급 실패 시 로그인 화면으로 이동
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  },
);

function redirectToLogin() {
  // window.location.href = '/login';
}

export default Apis;
