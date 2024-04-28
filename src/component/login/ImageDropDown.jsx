import Dropdown from '../../component/login/DropDown';
import '../../styles/login/AddInfoPage.scss';
import NoProfile from '../../assets/Login/NoProfile.png';
import { useRef, useState } from 'react';

const ImageDropDown = ({imageUrl, setImageUrl}) => {
    const [view, setView] = useState(false);
    const imgRef = useRef();

    const onChangeImage = () => {
      const reader = new FileReader();
      const file = imgRef.current.files[0];
      console.log(file);

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageUrl(reader.result);
        console.log('이미지주소', reader.result);
      };
    };

    const onClickFileBtn = () => {
      imgRef.current.click();
    };

    const onClickDefaultImage = () => {
      setImageUrl(null);
    };
    return (
      <>
        <div className="AddInfo_TopText">추가 정보 입력</div>
        {/* 프로필 이미지 등록 및 해제  - 컴포넌트 분리 필요*/}
        <div className="AddInfo_ImageWraaper">
          <img
            src={imageUrl ? imageUrl : NoProfile}
            className="AddInfo_Image"
          />
          <input
            type="file"
            ref={imgRef}
            onChange={onChangeImage}
            style={{ display: 'none' }}
          />
          <div
            onClick={() => {
              setView(!view);
            }}
            className="AddInfo_ImageBtn"
          >
            <div className="AddInfo_ImageBtn_Text">
              프로필 등록 {view ? '▲' : '▼'}
            </div>
            {view && (
              <Dropdown
                onClickFileBtn={onClickFileBtn}
                onClickDefaultImage={onClickDefaultImage}
              />
            )}
          </div>
        </div>
      </>
    );
};

export default ImageDropDown;