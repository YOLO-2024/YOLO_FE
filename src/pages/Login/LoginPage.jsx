import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import YoloLogo from '../../assets/svgs/YoloLogo';
import '../../styles/pages/login/LoginPage.scss';
import Saly from '../../assets/images/Saly.jpg';
import Naver from '../../assets/svgs/Naver';
import Kakao from '../../assets/svgs/Kakao';
import Google from '../../assets/svgs/Google';
import api from '../../utils/api';

export default function LoginPage() {
  const KAKAO_LOGIN_URL = process.env.REACT_APP_KAKAO_LOGIN_URL;
  const NAVER_LOGIN_URL = process.env.REACT_APP_NAVER_LOGIN_URL;
  const NAVER_LOGIN_STATE = process.env.REACT_APP_NAVER_LOGIN_STATE;
  const GOOGLE_LOGIN_URL = process.env.REACT_APP_GOOGLE_LOGIN_URL;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  const [socialType, setSocialType] = useState(
    sessionStorage.getItem('socialType') || '',
  );
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URL(document.URL).searchParams;
    const code = params.get('code');
    const state = params.get('state');

    if (code !== null && socialType) {
      api
        .post(`/api/v1/auth/${socialType}`, {
          authorizationCode: code,
          ...(socialType === 'naver' && { state: state }), // 네이버의 경우 state를 추가
        })
        .then((response) => {
          const { accessToken, refreshToken } = response.data.data.token;
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);

          return api.get('/api/v1/member/profile');
        })
        .then((profileResponse) => {
          const profileInfo = profileResponse.data.data.profileInfo;
          if (
            profileInfo.nickname &&
            profileInfo.location &&
            profileInfo.interestList
          ) {
            navigate('/main-page');
          } else {
            navigate('/addinfo');
          }
        })
        .catch((error) => {
          console.error('로그인 실패 또는 프로필 정보 로드 실패:', error);
          navigate('/addinfo');
        });
    }
  }, [socialType, navigate]);

  const kakaoHandleLogin = () => {
    sessionStorage.setItem('socialType', 'kakao');
    setSocialType('kakao');
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_LOGIN_URL}&redirect_uri=${REDIRECT_URI}`;
  };

  const naverHandleLogin = () => {
    sessionStorage.setItem('socialType', 'naver');
    setSocialType('naver');
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_LOGIN_URL}&state=${NAVER_LOGIN_STATE}&redirect_uri=${REDIRECT_URI}`;
  };

  const googleHandleLogin = () => {
    sessionStorage.setItem('socialType', 'google');
    setSocialType('google');
    window.location.href =
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_LOGIN_URL}` +
      `&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email profile`;
  };

  return (
    <div className="login_wrapper">
      <div style={{ marginLeft: '8px' }}>
        <YoloLogo />
      </div>
      <div className="styledText">소셜로그인</div>
      <div className="person">
        <img src={Saly} style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="loginWrapper">
        <div className="loginBox" onClick={naverHandleLogin}>
          <Naver />
        </div>
        <div className="loginBox" onClick={kakaoHandleLogin}>
          <Kakao />
        </div>
        <div className="loginBox" onClick={googleHandleLogin}>
          <Google />
        </div>
      </div>
    </div>
  );
}
