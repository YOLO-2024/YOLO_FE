import YoloLogo from '../../assets/svgs/YoloLogo';
import '../../styles/pages/login/LoginPage.scss';
import Saly from '../../assets/images/Saly.jpg';
import Naver from '../../assets/svgs/Naver';
import Kakao from '../../assets/svgs/Kakao';
import Google from '../../assets/svgs/Google';
import {
  naverHandleLogin,
  kakaoHandleLogin,
  googleHandleLogin,
} from '../../utils/socialLogin';

export default function LoginPage() {
  var params = new URL(document.URL).searchParams;
  var code = params.get('code');
  var state = params.get('state');

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
