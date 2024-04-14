import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SelectLocation from '../../components/common/SelectLocation';
import { locations } from '../../data/location';
import basicProfile from '../../assets/images/basicProfile.jpg';
import '../../styles/pages/login/AddInfoPage.scss';
import '../../styles/component/common/SelectLocation.scss';
// import { api } from '../../utils/customAxios';
import { accessTokenState } from '../../state/AuthState';
import axios from 'axios';
import { useRecoilValue } from 'recoil';

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
  const user = useRecoilValue(accessTokenState);
  const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

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
      setFile('');
    }
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

    console.log(json);
    console.log(locationData);
    console.log(formData);
    console.log(user);
    try {
      const res = await axios.post(
        `${CLIENT_URL}/api/v1/member/update-profile`,
        formData,
        {
          headers: { Authorization: `Bearer ` + user }, // 토큰 넣어주기
          'Content-Type': 'multipart/form-data',
        },
      );
      console.log(accessTokenState);
      console.log(res);
      navigate('/addinfo/interest');
    } catch (error) {
      console.error(error);
    }
  };

  const changeHandler = (value, name) => {
    setLocationData(value);
  };

  return (
    <div className="mainWrapper">
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
        <input
          id="photoURLInput"
          className="profileImgSubmit"
          style={{ display: 'none' }}
          name="file"
          type="file"
          {...register('file')}
          onChange={handleImageChange}
        />
        <label htmlFor="photoURLInput" className="profileImgSubmit">
          프로필 등록
        </label>
      </div>

      <div className="infoContainer">
        <form onSubmit={handleSubmit(addInfoHandler)}>
          <div className="container">
            <div className="text">거주지</div>
            <SelectLocation
              searchPlaceholder="Search"
              data={locations}
              value={locationData}
              onChange={changeHandler}
              error={errors.locationOne?.message}
              name="locationOne"
            />
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
