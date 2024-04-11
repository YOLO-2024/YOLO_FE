import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { accessTokenState, refreshTokenState } from '../state/AuthState';
import { api } from '../utils/customAxios';

export const useSocialLogin = ({ socialType }) => {
  const setAccessToken = useSetRecoilState(accessTokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URL(document.URL).searchParams;
    const code = params.get('code');
    const state = params.get('state');

    if (code !== null) {
      api
        .post(`/api/v1/auth/${socialType}`, {
          authorizationCode: code,
          ...(socialType === 'naver' && { state: state }), // 네이버의 경우 state를 추가
        })
        .then((response) => {
          const { accessToken, refreshToken } = response.data.data.token;
          setAccessToken(accessToken); // Recoil 상태 업데이트
          console.log(accessToken);
          setRefreshToken(refreshToken); // Recoil 상태 업데이트
          navigate('/addinfo'); // 홈으로 리다이렉트
        })
        .catch((error) => {
          console.error('로그인 실패:', error);
        });
    }
  }, [useSocialLogin]); // useEffect 의존성 배열

  return null;
};
