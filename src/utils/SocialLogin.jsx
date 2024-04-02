export const kakaoHandleLogin = () => {
  window.location.href =
    'https://kauth.kakao.com/oauth/authorize?client_id=b4b5d2ed58090488672fe944e6e4347a&redirect_uri=http://localhost:3000&response_type=code';
};
export const naverHandleLogin = () => {
  window.location.href =
    'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=B1udHi5_Be_LA3ipNxIp&state=hLiDdL2uhPtsftcU&redirect_uri=http://localhost:3000';
};

export const googleHandleLogin = () => {
  window.location.href =
    'https://accounts.google.com/o/oauth2/v2/auth?client_id=1047449344904-oe84fhmnv04mntj0ii6hp8futct0hp16.apps.googleusercontent.com' +
    '&redirect_uri=http://localhost:3000&response_type=code&scope=email profile';
};
