import { useEffect, useRef, useState } from 'react';
import '../../styles/pages/Post/EditPost.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import Category from './Category';
import { AddPhoto } from '../../assets/svgs/AddPhoto';
import { PreviousIcon } from '../../assets/svgs/PreviousIcon';
import { CancleIcon } from '../../assets/svgs/CancleIcon';
import api from '../../utils/api';

export default function EditPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const postData = { ...location.state };
  const [file, setFile] = useState(postData.postImage || []);
  const [imagePreview, setImagePreview] = useState(postData.postImage);
  const user = sessionStorage.getItem('accessToken');

  const [formState, setFormState] = useState({
    postId: postData.postInfo.postId,
    title: postData.postInfo.title,
    content: postData.postInfo.content,
    selectedCategories: postData.postInfo.categories,
  });

  const isValidForm = () => {
    return (
      formState.title &&
      formState.content &&
      formState.selectedCategories.length > 0
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const setSelectedCategories = (categories) => {
    setFormState({
      ...formState,
      selectedCategories: categories,
    });
  };

  // const handleImageChange = (e) => {
  //   const selectedFiles = Array.from(e.target.files);

  //   if (selectedFiles.every((file) => file.type.startsWith('image'))) {
  //     //동일한 형태로 만들어주기
  //     const newImagePreviews = selectedFiles.map((file) => ({
  //       imageUrl: URL.createObjectURL(file),
  //     }));
  //     const updatedFiles = [...file, ...selectedFiles];
  //     setFile(updatedFiles);
  //     console.log('add file', updatedFiles);
  //     console.log('편집 after:', file);

  //     setImagePreview((prevImagePreview) => [
  //       ...prevImagePreview,
  //       ...newImagePreviews,
  //     ]);
  //   } else {
  //     setFile([]);
  //     setImagePreview([]);
  //   }
  // };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    console.log(selectedFiles);
    if (selectedFiles.every((file) => file.type.startsWith('image'))) {
      const updatedFiles = [...file, ...selectedFiles];
      setFile(updatedFiles);
      const newImagePreviews = selectedFiles.map((file) =>
        URL.createObjectURL(file),
      );
      setImagePreview((prevImagePreview) => [
        ...prevImagePreview,
        ...newImagePreviews,
      ]); // 이미지 미리보기 상태 업데이트
    } else {
      setFile([]);
      setImagePreview([]);
    }
  };

  useEffect(() => {
    console.log(file);
  }, [file]);
  const handleDeleteImage = (i) => {
    const updatedImagesFile = file.filter((image, index) => i !== index);
    const updatedImagePreview = imagePreview.filter(
      (image, index) => i !== index,
    );

    setFile(updatedImagesFile);
    setImagePreview(updatedImagePreview);
    console.log(updatedImagesFile);
    console.log(updatedImagePreview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(file);
    const formData = new FormData();
    file.forEach((file) => {
      formData.append('files', file);
    });
    // console.log('제출', formData.files);
    const json = JSON.stringify({
      postId: formState.postId,
      title: formState.title,
      content: formState.content,
      categories: formState.selectedCategories,
    });

    const blob = new Blob([json], { type: 'application/json' });
    formData.append('postUpdateRequestDto', blob);

    await api
      .post('/api/v1/post/edit', formData, {
        headers: {
          Authorization: `Bearer ${user}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('수정', response);
        navigate(-1);
      })
      .catch((error) => {
        console.log('수정', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="onEditContainer">
        <div className="previousIcon" onClick={() => navigate(-1)}>
          <PreviousIcon />
        </div>
        <div
          className="EditButton"
          type="submit"
          onClick={handleSubmit}
          style={{
            background: isValidForm() ? ' #266ED7 6.68%' : ' #4D8AEB 99.25%',
          }}
        >
          수정
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
        <Category
          setSelectedCategories={setSelectedCategories}
          selectedCategories={formState.selectedCategories}
        />
      </div>

      <textarea
        name="content"
        className="content-input"
        placeholder="내용을 입력하세요."
        value={formState.content}
        onChange={handleChange}
      />

      {imagePreview.length >= 0 && (
        <div className="image-previewContainer">
          {imagePreview.map((src, index) => (
            <div key={index} className="image-preview">
              <img src={src.imageUrl ? src.imageUrl : src} alt="미리보기" />
              <div
                className="deleteImage"
                onClick={() => handleDeleteImage(index)}
              >
                <CancleIcon />
              </div>
            </div>
          ))}
        </div>
      )}

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
    </form>
  );
}
