import YoloLogo from '../../assets/svgs/YoloLogo';
import '../../styles/pages/login/LoginPage.scss';
import Saly from '../../assets/images/Saly.jpg';
import Naver from '../../assets/svgs/Naver';
import Kakao from '../../assets/svgs/Kakao';
import Google from '../../assets/svgs/Google';
import { useSocialLogin } from '../../hooks/useSocialLogin';

export default function LoginPage() {
  const KAKAO_LOGIN_URL = process.env.REACT_APP_KAKAO_LOGIN_URL;
  const NAVER_LOGIN_URL = process.env.REACT_APP_NAVER_LOGIN_URL;
  const NAVER_LOGIN_STATE = process.env.REACT_APP_NAVER_LOGIN_STATE;
  const GOOGLE_LOGIN_URL = process.env.REACT_APP_GOOGLE_LOGIN_URL;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  const socialType = sessionStorage.getItem('socialType');

  console.log(KAKAO_LOGIN_URL);
  console.log(REDIRECT_URI);
  const kakaoHandleLogin = () => {
    sessionStorage.setItem('socialType', 'kakao');
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_LOGIN_URL}&redirect_uri=${REDIRECT_URI}`;
  };

  const naverHandleLogin = () => {
    sessionStorage.setItem('socialType', 'naver');
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_LOGIN_URL}&state=${NAVER_LOGIN_STATE}&redirect_uri=${REDIRECT_URI}`;
  };

  const googleHandleLogin = () => {
    sessionStorage.setItem('socialType', 'google');
    window.location.href =
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_LOGIN_URL}` +
      `&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email profile`;
  };

  useSocialLogin({ socialType });

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
