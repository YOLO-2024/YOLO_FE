import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Category from '../Post/Category';
import '../../styles/pages/Chat/CreateChat.scss';
import { PreviousIcon } from '../../assets/svgs/PreviousIcon';
import { useForm } from 'react-hook-form';
import addChatPhoto from '../../assets/svgs/addChatPhoto.svg';
import api from '../../utils/api';
import close from '../../assets/svgs/close.svg';

export default function CreateChat() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm({ mode: 'all' });
  const [chatImg, setChatImg] = useState('');
  const [previewChatImg, setPreviewChatImg] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const watchedTitle = watch('title');
  const watchedContent = watch('content');

  const isFormValid =
    watchedTitle && watchedContent && selectedCategories.length > 0;

  const handleBack = () => {
    navigate(-1);
  };

  const setSelectedCategory = (categories) => {
    setSelectedCategories(categories);
  };

  const handleChatImgChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile && newFile.type.substr(0, 5) === 'image') {
      setChatImg(newFile);
    } else {
      setChatImg('');
      setPreviewChatImg('');
    }
  };

  const resetToDefaultImage = () => {
    setChatImg(null);
    setPreviewChatImg(null);
  };

  useEffect(() => {
    if (chatImg) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewChatImg(reader.result);
      };
      reader.readAsDataURL(chatImg);
    } else {
      setPreviewChatImg('');
    }
  }, [chatImg]);

  const addChatHandler = async (data) => {
    const chatFormData = new FormData();
    if (chatImg) {
      chatFormData.append('file', chatImg);
    }

    const jsonChat = JSON.stringify({
      title: data.title,
      content: data.content,
      interests: selectedCategories,
    });

    const blob = new Blob([jsonChat], { type: 'application/json' });
    chatFormData.append('chatRoomCreateRequestDto', blob);

    console.log(jsonChat);
    await api
      .post('/api/v1/chat/create', chatFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response);
        navigate('/chat-page');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="newChat_Wrapper">
      <form onSubmit={handleSubmit(addChatHandler)}>
        <div className="onPostContainer">
          <div className="previousIcon" onClick={handleBack}>
            <PreviousIcon />
          </div>
          <input
            type="submit"
            value="등록"
            className={`submitChat_Button ${isFormValid ? 'active' : ''}`}
            disabled={!isFormValid}
          />
        </div>

        <div className="Title-container">
          <div className="Title-label">채팅방 제목</div>
          <input
            className="Title-input"
            type="text"
            placeholder="제목을 입력해주세요."
            {...register('title')}
          />
        </div>
        <div className="Category-container">
          <div className="Category-label">카테고리</div>
          <Category setSelectedCategories={setSelectedCategory} />
        </div>

        <textarea
          name="content"
          className="ChatContent-input"
          placeholder="채팅방에 대한 소개를 작성해주세요."
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
            <button
              onClick={() => resetToDefaultImage()}
              className="resetDefaultImg_Button"
            >
              <img src={close} alt="이미지 제거" />
            </button>
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
