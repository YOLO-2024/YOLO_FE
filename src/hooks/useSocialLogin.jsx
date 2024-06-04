import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export const useSocialLogin = ({ socialType }) => {
  const navigate = useNavigate();
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const params = new URL(document.URL).searchParams;
        const code = params.get('code');
        const state = params.get('state');

        if (code !== null) {
          const response = await api.post(`/api/v1/auth/${socialType}`, {
            authorizationCode: code,
            ...(socialType === 'naver' && { state: state }), // 네이버의 경우 state를 추가
          });

          const { accessToken, refreshToken } = response.data.data.token;
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);

          const profileResponse = await api.get('/api/v1/member/profile');

          console.log('프로필 정보:', profileResponse.data);
          if (
            profileResponse.data.data.profileInfo.nickname &&
            profileResponse.data.data.profileInfo.location &&
            profileResponse.data.data.profileInfo.interestList
          ) {
            navigate('/main-page');
          } else {
            navigate('/addinfo');
          }
        }
      } catch (error) {
        console.error('로그인 실패 또는 프로필 정보 로드 실패:', error);
        navigate('/addinfo');
      }
    };

    handleLogin();
  }, [socialType, navigate]);

  return null;
};
