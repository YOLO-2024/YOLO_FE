import '../../styles/pages/MyPage.scss';
import defaultImage from '../../assets/images/basicProfile.jpg';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
// import close from '../../assets/svgs/close.svg';

export default function EditProfile() {
  const isWriter = JSON.parse(sessionStorage.getItem('myInfo'));
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState(
    isWriter.profileInfo.location,
  );
  const [isLocationValid, setIsLocationValid] = useState(true);
  const [profile, setProfile] = useState(null);

  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);
  const [drop, setDrop] = useState(false);
  const [formState, setFormState] = useState({
    nickname: isWriter.profileInfo.nickname,
    content: isWriter.profileInfo.content,
  });

  const SelectLocation = lazy(
    () => import('../../components/common/SelectLocation'),
  );
  const changeHandler = (value, name) => {
    setLocationData(value);
    setIsLocationValid(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleDefaultImage = () => {
    setImagePreview(defaultImage);
    setProfile(defaultImage);
    setDrop(false);
  };

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
    const initializeFile = async () => {
      if (isWriter.profileImage) {
        const file = await convertURLtoFile(isWriter.profileImage.imageUrl);
        setProfile(file);
        setImagePreview(isWriter.profileImage.imageUrl);
      } else {
        setProfile(defaultImage);
        setImagePreview(defaultImage);
      }
    };
    initializeFile();
  }, []);

  const handleImageChange = (e) => {
    const newFile = e.target.files[0];

    if (newFile && newFile.type.substr(0, 5) === 'image') {
      setProfile(newFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(newFile);
    }
    setDrop(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append('file', profile);
    if (profile && profile !== defaultImage) {
      formData.append('file', profile);
    }
    formData.append(
      'updateProfileRequestDto',
      new Blob(
        [
          JSON.stringify({
            nickname: formState.nickname,
            location: locationData,
            content: formState.content,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    api
      .post('/api/v1/member/update-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response), navigate('/Mypage/edit/interest');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="My_ProfileEdit_Container">
      <div className="My_ProfileImage_Wrapper">
        <div className="My_ProfileImage">
          <img
            src={
              imagePreview
              // ? imagePreview
              // : isWriter.profileImage
              //   ? isWriter.profileImage.imageUrl
              //   : defaultImage
            }
          />
        </div>
        <div className="My_ProfileImage_button" onClick={() => setDrop(!drop)}>
          프로필 등록 {drop ? '▲' : '▼'}
          {drop && (
            <div className="dropdown-menu">
              <div
                className="My_ProfileImage_button_selecte"
                onClick={() => {
                  fileInputRef.current.click();
                }}
              >
                이미지 선택
              </div>
              <div
                className="My_ProfileImage_button_default"
                onClick={handleDefaultImage}
              >
                기본 이미지
              </div>
            </div>
          )}
        </div>

        <input
          id="photoURLInput"
          className="AddPhoto"
          style={{ display: 'none' }}
          name="file"
          type="file"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
      </div>

      <div className="My_ProfileInfo_Wrapper">
        <form onSubmit={handleSubmit}>
          <div className="My_ProfileInfo_Location">
            <div className="My_ProfileInfo_text">거주지</div>
            <Suspense fallback={<div>loading...</div>}>
              <SelectLocation value={locationData} onChange={changeHandler} />
            </Suspense>
            {!isLocationValid && (
              <div className="errorMessage">거주지를 입력해주세요.</div>
            )}
          </div>
          <div className="My_ProfileInfo_Name">
            <div className="My_ProfileInfo_text">닉네임</div>
            <input
              name="nickname"
              className="My_ProfileInfo_input"
              value={formState.nickname}
              onChange={handleChange}
            />
          </div>
          <div className="My_ProfileInfo_Introduce">
            <div className="My_ProfileInfo_text">한 줄 소개</div>
            <input
              name="content"
              className="My_ProfileInfo_input"
              value={formState.content}
              onChange={handleChange}
            />
          </div>
          <div className="My_ProfileInfo_Button">
            <button
              className="My_ProfileInfo_editButton"
              disabled={!formState.nickname || !formState.content}
              onClick={handleSubmit}
            >
              수정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
