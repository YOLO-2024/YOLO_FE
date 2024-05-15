import { PreviousIcon } from '../../assets/svgs/PreviousIcon';
import { useForm } from 'react-hook-form';
import Category from '../Post/Category';
import addChatPhoto from '../../assets/svgs/addChatPhoto.svg';
import close from '../../assets/svgs/close.svg';
import '../../styles/pages/Chat/CreateChat.scss';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../utils/api';

export default function EditChatRoom() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [title, setTitle] = useState(state.chatRoomInfo.title);
  const [contents, setContents] = useState(state.chatRoomInfo.content);
  const { register, handleSubmit, watch } = useForm({ mode: 'all' });
  const [selectedCategories, setSelectedCategories] = useState(
    state.chatRoomInfo.interests,
  );

  const [imageUrl, setImageUrl] = useState(state.chatRoomImage);
  const [imagePreview, setImagePreview] = useState();

  const watchedTitle = watch('title');
  const watchedContent = watch('content');

  const isFormValid = watchedTitle && watchedContent && selectedCategories;

  const handleChatImgChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile && newFile.type.substr(0, 5) === 'image') {
      // 이미지 파일인 경우
      setImageUrl(newFile); // 이미지 파일로 설정
      console.log(newFile);
      // 이미지 URL 설정
      const imageUrl = URL.createObjectURL(newFile);
      setImagePreview(imageUrl);
    } else {
      resetToDefaultImage(); // 이미지를 삭제할 때 호출
    }
  };

  const resetToDefaultImage = () => {
    setImagePreview(null);
    setImageUrl(null);
  };

  useEffect(() => {
    if (state.chatRoomImage) {
      setImagePreview(state.chatRoomImage.imageUrl);

      convertURLtoFile(state.chatRoomImage.imageUrl).then((response) => {
        setImageUrl(response);
      });
    } else {
      resetToDefaultImage();
    }
  }, []);

  console.log(state);
  console.log(imageUrl);
  console.log(state.chatRoomImage);

  const convertURLtoFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split('.').pop(); // url 구조에 맞게 수정할 것
    const filename = url.split('/').pop(); // url 구조에 맞게 수정할 것
    const metadata = { type: `image/${ext}` };
    return new File([data], filename, metadata);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const setSelectedCategory = (categories) => {
    setSelectedCategories(categories);
  };

  const onClickedSubmit = async (data) => {
    const formData = new FormData();
    // chatRoomUpdateRequestDto 객체 생성
    const jsonChat = JSON.stringify({
      chatRoomId: state.chatRoomInfo.chatRoomId,
      title: data.title,
      content: data.content,
      interests: selectedCategories,
    });

    const blob = new Blob([jsonChat], { type: 'application/json' });
    // chatRoomUpdateRequestDto 객체를 문자열로 변환하여 formData에 추가
    formData.append('chatRoomUpdateRequestDto', blob);

    // 이미지 파일이 존재하는 경우 formData에 추가
    if (imageUrl) {
      formData.append('file', imageUrl);
    }
    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    // formData 내용 콘솔로 출력
    console.log(jsonChat);
    await api
      .post('/api/v1/chat/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('POST 요청 응답 데이터:', response.data);
        console.log(imageUrl);
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

        {imagePreview &&
          imageUrl && ( // 이미지가 있을 때만 렌더링
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

        <div>
          <label htmlFor="photoURLInput" className="addImage-container">
            <img src={addChatPhoto} alt="채팅방 이미지 추가" />
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
