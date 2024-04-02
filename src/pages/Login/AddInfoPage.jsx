import '../../styles/pages/login/AddInfoPage.scss';
// import test from '../../assets/svgs/test.svg';
import basicProfile from '../../assets/images/basicProfile.jpg';

export default function AddInfoPage() {
  return (
    <div className="wrapper">
      <div className="styledText">추가정보 입력</div>
      <div className="profileWrapper">
        <div className="profileImg">
          <img
            src={basicProfile}
            style={{ width: '100%', borderRadius: '45px' }}
          />
        </div>
        <div className="profileImgSubmit">프로필 등록</div>
      </div>
      <div className="text">거주지</div>
    </div>
  );
}
