import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Apis from '../../apis/axios';
import '../../styles/login/LoginPage.scss';
import AppLogo from '../../assets/Header/AppLogo.svg';
import Character from '../../assets/Login/Character.png';
import Kakao from '../../assets/Login/Kakao.svg';
import Google from '../../assets/Login/Google.svg';
import Naver from '../../assets/Login/Naver.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
  sessionStorage.removeItem('memberState');

  useEffect(() => {
    const handleSocialLogin = async () => {
      const params = new URL(document.URL).searchParams;
      const code = params.get('code');
      const state = params.get('state');
      const socialType = sessionStorage.getItem('socialType');

      if (code && socialType) {
        try {
          const response = await Apis.post(`/api/v1/auth/${socialType}`, {
            authorizationCode: code,
            state: state || undefined,
          });
          sessionStorage.setItem(
            'accessToken',
            response.data.data.token.accessToken,
          );
          sessionStorage.setItem(
            'refreshToken',
            response.data.data.token.refreshToken,
          );
          if (response.data.data.profile.profileInfo.nickname == null) {
            navigate('/addInfo');
          } else {
            navigate('/');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };
    handleSocialLogin();
  }, [navigate]);

  const handleLogin = (socialType, authUrl) => {
    sessionStorage.setItem('socialType', socialType);
    window.location.href = authUrl;
  };

  return (
    <div className="Login_Container">
      <div className="Login_Wrapper">
        <div className="Login_Top">
          <img src={AppLogo} alt="AppLogo" className="Login_Logo" />
          <div className="Login_Text">소셜 로그인</div>
        </div>
        <div className="Login_Character">
          <img src={Character} alt="Character" className="Character_img" />
        </div>
        <div className="Login_Button_Collection">
          <img
            src={Kakao}
            alt="Kakao"
            onClick={() =>
              handleLogin("kakao", process.env.REACT_APP_KAKAO_LOGIN_URL)
            }
          />
          <img
            src={Naver}
            alt="Naver"
            onClick={() =>
              handleLogin("naver", process.env.REACT_APP_NAVER_LOGIN_URL)
            }
          />
          <img
            src={Google}
            alt="Google"
            onClick={() =>
              handleLogin("google", process.env.REACT_APP_GOOGLE_LOGIN_URL)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
