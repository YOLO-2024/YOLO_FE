import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Category from '../Post/Category';
import '../../styles/pages/Post/NewPost.scss';
import { PreviousIcon } from '../../assets/svgs/PreviousIcon';
import { AddPhoto } from '../../assets/svgs/AddPhoto';
import { useForm } from 'react-hook-form';
import addChatPhoto from '../../assets/svgs/addChatPhoto.svg';

export default function CreateChat() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [chatImg, setChatImg] = useState('');
  const [previewChatImg, setPreviewChatImg] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSelect = (value) => {
    let updatedInterest = [];
    if (selectedCategories.includes(value)) {
      updatedInterest = selectedCategories.filter((arr) => arr !== value);
    } else {
      updatedInterest = [...selectedCategories, value];
    }
    setSelectedCategories(updatedInterest);
  };
  console.log(selectedCategories);

  /*
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
    setFormState(initialState);
  };
*/
  const handleChatImgChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile && newFile.type.substr(0, 5) === 'image') {
      setChatImg(newFile);
    } else {
      setChatImg('');
      setPreviewChatImg(''); // 이미지가 아닐 경우 미리보기 이미지를 비웁니다.
    }
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
    });

    const blob = new Blob([jsonChat], { type: 'application/json' });
    chatFormData.append('chatRoomCreateRequestDto', blob);

    console.log(jsonChat);
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
            className="onPost"
            onClick={handleSubmit}
            style={{
              background: '#c2c2c2',
              width: ' 60.371px',
              height: '37px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              border: 'none',
            }}
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
          <Category setSelectedCategories={handleSelect} />
        </div>
        <textarea
          name="content"
          className="ChatContent-input"
          placeholder="채팅방에 대한 소개를 작성해주세요."
          {...register('content')}
        />
        <div
          style={{
            display: 'flex',
            width: '100%',
            position: 'fixed',
            bottom: '0%',
          }}
        >
          {previewChatImg && (
            <div className="previewChatImg_container">
              <img
                src={previewChatImg}
                alt="미리보기 이미지"
                style={{ width: '100%', height: '100%', borderRadius: '10px' }}
              />
            </div>
          )}
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
