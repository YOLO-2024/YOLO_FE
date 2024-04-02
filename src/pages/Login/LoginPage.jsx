import YoloLogo from '../../assets/svgs/YoloLogo';
import '../../styles/pages/login/LoginPage.scss';
import Saly from '../../assets/images/Saly.jpg';
import Naver from '../../assets/svgs/Naver';
import Kakao from '../../assets/svgs/Kakao';
import Google from '../../assets/svgs/Google';

export default function LoginPage() {
  var params = new URL(document.URL).searchParams;
  var code = params.get('code');
  var state = params.get('state');

  const kakaoHandleLogin = () => {
    window.location.href =
      'https://kauth.kakao.com/oauth/authorize?client_id=b4b5d2ed58090488672fe944e6e4347a&redirect_uri=http://localhost:3000&response_type=code';
  };

  const naverHandleLogin = () => {
    window.location.href =
      'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=B1udHi5_Be_LA3ipNxIp&state=hLiDdL2uhPtsftcU&redirect_uri=http://localhost:3000';
  };

  const googleHandleLogin = () => {
    window.location.href =
      'https://accounts.google.com/o/oauth2/v2/auth?client_id=1047449344904-oe84fhmnv04mntj0ii6hp8futct0hp16.apps.googleusercontent.com' +
      '&redirect_uri=http://localhost:3000&response_type=code&scope=email profile';
  };

  return (
    <div className="wrapper">
      <YoloLogo />
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
      <div>code : {code}</div>
      <div>state : {state}</div>
    </div>
  );
}
