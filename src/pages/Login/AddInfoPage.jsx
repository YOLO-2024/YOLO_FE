import { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import SelectLocation from '../../components/common/SelectLocation';
import basicProfile from '../../assets/images/basicProfile.jpg';
import '../../styles/pages/login/AddInfoPage.scss';
import '../../styles/component/common/SelectLocation.scss';
import api from '../../utils/api';

const SelectLocation = lazy(
  () => import('../../components/common/SelectLocation'),
);

export default function AddInfoPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' });
  const [locationData, setLocationData] = useState('');
  const [file, setFile] = useState('');
  const [imagePreview, setImagePreview] = useState(basicProfile);
  const [isLocationValid, setIsLocationValid] = useState(false);
  const userTok = sessionStorage.getItem('accessToken');
  const fileInputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(basicProfile);
    }
    console.log(file);
  }, [file]);

  useEffect(() => {
    setIsLocationValid(!!locationData);
  }, [locationData]);

  const handleImageChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile && newFile.type.substr(0, 5) === 'image') {
      setFile(newFile);
    } else {
      setFile(null);
    }
    setIsOpen(false);
  };

  const addInfoHandler = async (data) => {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    const json = JSON.stringify({
      nickname: data.nickname,
      location: locationData,
      content: data.contents,
    });

    const blob = new Blob([json], { type: 'application/json' });
    formData.append('updateProfileRequestDto', blob);

    console.log('before' + userTok);
    console.log(json);
    console.log(locationData);
    console.log(formData);
    await api
      .post('/api/v1/member/update-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('after' + userTok);
        console.log(response);
        navigate('/addinfo/interest');
      })
      .catch((error) => {
        console.log('after' + userTok);
        console.error(error);
      });
  };

  const changeHandler = (value, name) => {
    setLocationData(value);
  };

  return (
    <div>
      <div className="styledText">추가정보 입력</div>
      <div className="profileWrapper">
        <div className="profileImg">
          <img
            src={imagePreview}
            style={{
              borderRadius: '30%',
              width: 'calc(var(--vh, 1vh) * 15)',
              height: 'calc(var(--vh, 1vh) * 15)',
            }}
          />
        </div>
        <div className="profileImg_btn" onClick={() => setIsOpen(!isOpen)}>
          프로필 등록 {isOpen ? '▲' : '▼'}
          {isOpen && (
            <div className="dropdown_container">
              <div
                className="setProfileImg_btn"
                onClick={() => {
                  fileInputRef.current.click();
                }}
              >
                이미지 선택
              </div>
              <div
                className="setProfileImg_btn"
                onClick={() => {
                  setImagePreview(basicProfile);
                  setFile('');
                  setIsOpen(false);
                }}
              >
                기본 이미지
              </div>
            </div>
          )}
        </div>
        <input
          id="photoURLInput"
          style={{ display: 'none' }}
          name="file"
          type="file"
          {...register('file')}
          onChange={handleImageChange}
          ref={fileInputRef}
        />
      </div>

      <div className="infoContainer">
        <form onSubmit={handleSubmit(addInfoHandler)}>
          <div className="container">
            <div className="text">거주지</div>
            <Suspense fallback={<div>loading...</div>}>
              <SelectLocation onChange={changeHandler} />
            </Suspense>
            {!isLocationValid && (
              <div className="errorMessage">거주지를 입력해주세요.</div>
            )}
          </div>
          <div className="container">
            <div className="text">닉네임</div>
            <input
              className={`inputWrapper ${errors.nickname ? 'inputError' : ''}`}
              type="text"
              {...register('nickname', { required: '닉네임을 입력해주세요.' })}
            ></input>
            {errors.nickname && (
              <div className="errorMessage">{errors.nickname.message}</div>
            )}
          </div>
          <div className="container">
            <div className="text">한 줄 소개</div>
            <input
              className="inputWrapper"
              type="text"
              {...register('contents')}
            ></input>
          </div>
          <div
            className="container"
            style={{ marginTop: 'calc(var(--vh, 1vh) * 3)' }}
          >
            <input
              type="submit"
              value="다음"
              className={`submitButton ${isValid && isLocationValid ? 'active' : ''}`}
              disabled={!isValid || !isLocationValid}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
