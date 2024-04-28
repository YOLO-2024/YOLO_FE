import axios from "axios";

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
    const accessToken  = token
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

    if (err.response && err.response.status === 401) {
      try {
        const data = await axios.post(
          `${import.meta.env.VITE_ENDPOINT}/api/v1/auth/access`,
          {
            refreshToken: sessionStorage.getItem('refreshToken')
          }
        );
        console.log(data)
        if (data) {
          sessionStorage.setItem(
            'accessToken',
            data.data.data.accessToken
          );
          sessionStorage.setItem(
            'refreshToken',
            data.data.data.refreshToken
          );
          return await Apis.request(originalConfig);
        }
      } catch (err) {
        // sessionStorage.clear();
        console.log('토큰 갱신 에러');
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  },
);
export default Apis;
