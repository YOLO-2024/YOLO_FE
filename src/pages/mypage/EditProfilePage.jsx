import { useEffect, useState } from 'react';
import '../../styles/login/AddInfoPage.scss';
import LocationDropDown from '../../component/login/LocationDropDown';
import ImageDropDown from '../../component/login/ImageDropDown';
import LoginInput from '../../component/login/LoginInput';
import SubmitButton from '../../component/login/SubmitButton';

const EditProfilePage = () => {
  // 프로필 이미지 등록
  const [imageUrl, setImageUrl] = useState(null);
  // 거주지 등록
  const [location, setLocation] = useState(null);
  // 닉네임 등록
  const [nickname, setNickname] = useState(null);
  // 한 줄 소개 등록
  const [introduce, setIntroduce] = useState(null);

  const [preview, setPreview] = useState(null);

  const member = JSON.parse(sessionStorage.getItem('memberState'));
  console.log(member);

  useEffect(() => {
    if (preview) {
      setImageUrl(convertURLtoFile(imageUrl));
    }
  }, []);

  const convertURLtoFile = async (url) => {
    const response = await fetch(url, {
      cache: 'no-cache',
    });
    const data = await response.blob();
    const ext = url.split('.').pop(); // url 구조에 맞게 수정할 것
    const filename = url.split('/').pop(); // url 구조에 맞게 수정할 것
    const metadata = { type: `image/${ext}` };
    return new File([data], filename, metadata);
  };

  useEffect(() => {
    setPreview(member.profileImage ? member.profileImage.imageUrl : null);
    setLocation(member.profileInfo.location || null);
    setNickname(member.profileInfo.nickname || null);
    setIntroduce(member.profileInfo.content || null);
  }, []);

  return (
    <div className="AddInfo_Container">
      <div className="AddInfo_Wrapper">
        <ImageDropDown
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          preview={preview}
          setPreview={setPreview}
        />
        <LocationDropDown location={location} setLocation={setLocation} />
        <LoginInput type="닉네임" value={nickname} setValue={setNickname} />
        <LoginInput
          type="한 줄 소개"
          value={introduce}
          setValue={setIntroduce}
        />
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

export default EditProfilePage;
