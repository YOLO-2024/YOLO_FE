import { PreviousIcon } from '../../assets/svgs/PreviousIcon';
import { useForm } from 'react-hook-form';
import Category from '../Post/Category';
import addChatPhoto from '../../assets/svgs/addChatPhoto.svg';
import '../../styles/pages/Chat/CreateChat.scss';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../utils/api';

export default function EditChatRoom() {
  const navigate = useNavigate();
  const location = useLocation();
  const chatRoomData = { ...location.state };

  const { register, handleSubmit } = useForm({ mode: 'all' });
  const editState = {
    title: chatRoomData.chatRoomInfo.title,
    content: chatRoomData.chatRoomInfo.content,
    selectedCategories: chatRoomData.chatRoomInfo.interests,
  };
  const editImgState = chatRoomData.chatRoomImage.imageUrl;
  const [file, setFile] = useState(editImgState);

  const [previewChatImg, setPreviewChatImg] = useState(editImgState);
  const [formState, setFormState] = useState(editState);
  console.log(chatRoomData);
  const handleBack = () => {
    navigate(-1);
  };

  const setSelectedCategories = (categories) => {
    setFormState({
      ...formState,
      selectedCategories: categories,
    });
  };

  const handleChatImgChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile && newFile.type.substr(0, 5) === 'image') {
      setFile(newFile);
    } else {
      setFile(null);
      setPreviewChatImg(null);
    }
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewChatImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewChatImg('');
    }
  }, [file]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onClickedSubmit = async () => {
    // console.log(formState);
    // setFormState(initialState);
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    const json = JSON.stringify({
      title: formState.title,
      content: formState.content,
      interests: formState.selectedCategories,
    });
    const blob = new Blob([json], { type: 'application/json' });
    formData.append('chatRoomUpdateRequestDto"', blob);

    console.log(json);
    console.log(formData);
    await api
      .post('/api/v1/chat/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response);
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="newChat_Wrapper">
      <form onSubmit={handleSubmit(onClickedSubmit)}>
        <div className="onPostContainer">
          <div className="previousIcon" onClick={handleBack}>
            <PreviousIcon />
          </div>
          <div type="submit" className="submitChat_Button">
            수정
          </div>
        </div>

        <div className="Title-container">
          <div className="Title-label">채팅방 제목</div>
          <input
            className="Title-input"
            type="text"
            defaultValue={formState.title}
            onChange={handleChange}
            {...register('title')}
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
          className="ChatContent-input"
          defaultValue={formState.content}
          onChange={handleChange}
          {...register('content')}
        />

        {previewChatImg && (
          <div className="previewChatImg_Container">
            <img
              src={previewChatImg}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '10px',
              }}
            />
          </div>
        )}
        <div>
          <label htmlFor="photoURLInput" className="addImage-container">
            <img src={addChatPhoto} />
            <div>채팅방 커버 이미지 추가</div>
          </label>
          <input
            id="photoURLInput"
            name="file"
            type="file"
            style={{ display: 'none' }}
            {...register('file')}
            onChange={handleChatImgChange}
          />
        </div>
      </form>
    </div>
  );
}
