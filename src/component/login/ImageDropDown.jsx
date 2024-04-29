import Dropdown from '../../component/login/DropDown';
import '../../styles/login/AddInfoPage.scss';
import NoProfile from '../../assets/Login/NoProfile.png';
import { useRef, useState } from 'react';

const ImageDropDown = ({imageUrl, setImageUrl}) => {
    const [view, setView] = useState(false);
    const [preview, setPreview] = useState(null);
    const imgRef = useRef();

    const onChangeImage = (e) => {
      const file = e.target.files[0]; // 첫 번째 파일만 선택
      if (!file) return;

      const reader = new FileReader();
      setImageUrl(file);
      reader.onloadend = () => {
        // 이미지를 미리보기로 설정
        setPreview(reader.result);
      };

      reader.readAsDataURL(file);
    };

    const onClickFileBtn = () => {
      imgRef.current.click();
    };

    const onClickDefaultImage = () => {
      setImageUrl(null);
      setPreview(null);
    };

    return (
      <>
        <div className="AddInfo_TopText">추가 정보 입력</div>
        {/* 프로필 이미지 등록 및 해제  - 컴포넌트 분리 필요*/}
        <div className="AddInfo_ImageWraaper">
          <img
            src={preview ? preview : NoProfile}
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