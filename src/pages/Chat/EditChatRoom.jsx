import { PreviousIcon } from '../../assets/svgs/PreviousIcon';
import { useForm } from 'react-hook-form';
import Category from '../Post/Category';
import addChatPhoto from '../../assets/svgs/addChatPhoto.svg';
import '../../styles/pages/Chat/CreateChat.scss';
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import close from '../../assets/svgs/close.svg';

export default function EditChatRoom() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [title, setTitle] = useState(state.chatRoomInfo.title);
  const [contents, setContents] = useState(state.chatRoomInfo.content);
  const { register, handleSubmit, watch } = useForm({ mode: 'all' });
  const [selectedCategories, setSelectedCategories] = useState(
    state.chatRoomInfo.interests,
  );

  const [imageUrl, setImageUrl] = useState();
  const imgRef = useRef();
  const [imagePreview, setImagePreview] = useState();

  const watchedTitle = watch('title');
  const watchedContent = watch('content');

  const isFormValid = watchedTitle && watchedContent && selectedCategories;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    setImageUrl(file);
    reader.onloadend = () => {
      setImagePreview(reader.result); // 미리보기 이미지 설정
    };
    reader.readAsDataURL(file); // 파일 읽기
  };

  const onClickFileBtn = () => {
    imgRef.current?.click(); // useRef를 통해 파일 입력 요소 클릭
  };

  const resetToDefaultImage = () => {
    setImageUrl(null);
    setImagePreview(imageUrl);
    console.log(imagePreview);
  };

  console.log(state);
  console.log(imageUrl);
  console.log(imagePreview);
  console.log(state.chatRoomImage);

  const convertURLtoFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split('.').pop(); // url 구조에 맞게 수정할 것
    const filename = url.split('/').pop(); // url 구조에 맞게 수정할 것
    const metadata = { type: `image/${ext}` };
    return new File([data], filename, metadata);
  };

  useEffect(() => {
    setImagePreview(state.chatRoomImage ? state.chatRoomImage.imageUrl : null);

    if (state.chatRoomImage) {
      convertURLtoFile(state.chatRoomImage.imageUrl).then((response) => {
        console.log(response);
        setImageUrl(response);
      });
    } else {
      setImageUrl(null);
    }
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const setSelectedCategory = (categories) => {
    setSelectedCategories(categories);
  };

  const onClickedSubmit = async () => {
    const formData = new FormData();
    formData.append('file', imageUrl);
    formData.append(
      'chatRoomUpdateRequestDto',
      new Blob([
        JSON.stringify({
          chatRoomId: state.chatRoomInfo.chatRoomId,
          title: title,
          content: contents,
          interests: selectedCategories,
        }),
      ]),
    );

    await api
      .post('/api/v1/chat/update', formData, {
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
      <form onSubmit={handleSubmit(onClickedSubmit)}>
        <div className="onPostContainer">
          <div className="previousIcon" onClick={handleBack}>
            <PreviousIcon />
          </div>
          <input
            type="submit"
            value="수정"
            className={`submitChat_Button ${isFormValid ? 'active' : ''}`}
            disabled={!isFormValid}
          />
        </div>
        <div className="Title-container">
          <div className="Title-label">채팅방 제목</div>
          <input
            className="Title-input"
            type="text"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            {...register('title')}
          />
        </div>
        <div className="Category-container">
          <div className="Category-label">카테고리</div>
          <Category
            setSelectedCategories={setSelectedCategory}
            selectedCategories={selectedCategories}
          />
        </div>
        <textarea
          name="content"
          className="ChatContent-input"
          defaultValue={contents}
          onChange={(e) => setContents(e.target.value)}
          {...register('content')}
        />

        {imagePreview && (
          <div className="previewChatImg_Container">
            <img
              src={imagePreview}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '10px',
              }}
            />
            {/* file 대신 imagePreview를 검사하여 close 버튼 렌더링 */}
            <button
              onClick={() => resetToDefaultImage()}
              className="resetDefaultImg_Button"
            >
              <img src={close} alt="이미지 제거" />
            </button>
          </div>
        )}

        <div onClick={onClickFileBtn}>
          <label htmlFor="photoURLInput" className="addImage-container">
            <img src={addChatPhoto} />
            <div>채팅방 커버 이미지 추가</div>
          </label>
          <input
            type="file"
            ref={imgRef}
            style={{ display: 'none' }}
            {...register('file')}
            onChange={handleImageChange}
          />
        </div>
      </form>
    </div>
  );
}
