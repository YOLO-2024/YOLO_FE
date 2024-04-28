import { useState } from 'react';
import '../../styles/login/AddInfoPage.scss';
import LocationDropDown from '../../component/login/LocationDropDown';
import ImageDropDown from '../../component/login/ImageDropDown';
import LoginInput from '../../component/login/LoginInput';
import SubmitButton from '../../component/login/SubmitButton';

const AddInfoPage = () => {
    // 프로필 이미지 등록
    const [imageUrl, setImageUrl] = useState(null);
    // 거주지 등록
    const [location, setLocation] = useState(null);
    // 닉네임 등록
    const [nickname, setNickname] = useState(null);
    // 한 줄 소개 등록
    const [introduce, setIntroduce] = useState(null);

    return (
      <div className="AddInfo_Container">
        <div className="AddInfo_Wrapper">
          <ImageDropDown imageUrl={imageUrl} setImageUrl={setImageUrl} />
          <LocationDropDown location={location} setLocation={setLocation} />
          <LoginInput type="닉네임" nickname={nickname} setNickname={setNickname} />
          <LoginInput type="한 줄 소개" introduce={introduce} setIntroduce={setIntroduce} />
          <SubmitButton 
            imageUrl={imageUrl} 
            location={location} 
            nickname={nickname} 
            introduce={introduce}
          />
        </div>
      </div>
    );
};

export default AddInfoPage;