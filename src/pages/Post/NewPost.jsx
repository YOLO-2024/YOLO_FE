import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Category from './Category';
import '../../styles/pages/Post/NewPost.scss';
import { PreviousIcon } from '../../assets/svgs/PreviousIcon';
import { AddPhoto } from '../../assets/svgs/AddPhoto';
import { accessTokenState } from '../../state/AuthState';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { CancleIcon } from '../../assets/svgs/CancleIcon';

export default function NewPost() {
  const navigate = useNavigate();
  const user = useRecoilValue(accessTokenState);
  const [file, setFile] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const fileInputRef = useRef(null);
  const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;
  const initialState = {
    title: '',
    content: '',
    selectedCategories: [],
  };
  const [formState, setFormState] = useState(initialState);

  const handleBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.every((file) => file.type.startsWith('image'))) {
      setFile(selectedFiles); // 파일 상태 업데이트
      const newImagePreviews = selectedFiles.map((file) =>
        URL.createObjectURL(file),
      );
      setImagePreview(newImagePreviews); // 이미지 미리보기 상태 업데이트
    } else {
      setFile([]);
      setImagePreview([]);
    }
  };

  const handleDeleteImage = (src) => {
    setImagePreview(imagePreview.filter((imageSrc) => imageSrc !== src));
  };

  const isValidForm = () => {
    return (
      formState.title &&
      formState.content &&
      formState.selectedCategories.length > 0
    );
  };

  const setSelectedCategories = (categories) => {
    setFormState({
      ...formState,
      selectedCategories: categories,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formState);
    // setFormState(initialState);
    const formData = new FormData();
    file.forEach((file) => {
      formData.append('files', file); // 여러 파일을 formData에 추가
    });
    const json = JSON.stringify({
      title: formState.title,
      content: formState.content,
      categories: formState.selectedCategories,
    });
    const blob = new Blob([json], { type: 'application/json' });
    formData.append('postCreateRequestDto', blob);

    console.log(json);
    console.log(formData);
    try {
      const response = await axios.post(
        `${CLIENT_URL}/api/v1/post/create`,
        formData,
        {
          headers: { Authorization: `Bearer ` + user },
          'Content-Type': 'multipart/form-data',
        },
      );
      console.log('server response: ', response.data);
      navigate('/post-page');
    } catch (error) {
      console.error('newpost API error: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="onPostContainer">
        <div className="previousIcon" onClick={handleBack}>
          <PreviousIcon />
        </div>
        <div
          type="submit"
          className={`{onPost ${!isValidForm() ? 'disabled' : ''}}`}
          onClick={handleSubmit}
          style={{
            background: isValidForm() ? ' #266ED7 6.68%' : '  #C2C2C2',
            width: ' 60.371px',
            height: '37px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
          }}
        >
          게시
        </div>
      </div>

      <div className="Title-container">
        <div className="Title-label">제목</div>
        <input
          name="title"
          className="Title-input"
          placeholder="제목을 입력해주세요."
          value={formState.title}
          onChange={handleChange}
        />
      </div>
      <div className="Category-container">
        <div className="Category-label">카테고리</div>
        <Category setSelectedCategories={setSelectedCategories} />
      </div>
      <textarea
        name="content"
        className="Content-input"
        placeholder="내용을 입력하세요."
        value={formState.content}
        onChange={handleChange}
      />

      <div
        className="addImage-container"
        onClick={() => fileInputRef.current.click()}
      >
        <div className="AddPhoto">
          <AddPhoto />
        </div>
        <div>이미지 추가</div>
      </div>
      <input
        id="photoURLInput"
        className="AddPhoto"
        style={{ display: 'none' }}
        name="file"
        type="file"
        onChange={handleImageChange}
        ref={fileInputRef}
        multiple
      />
      {imagePreview.length >= 0 && (
        <div className="image-previewContainer">
          {imagePreview.map((src) => (
            <div key={src} className="image-preview">
              <img src={src} alt="미리보기" />
              <div
                className="deleteImage"
                onClick={() => handleDeleteImage(src)}
              >
                <CancleIcon />
              </div>
            </div>
          ))}
        </div>
      )}
    </form>
  );
}
