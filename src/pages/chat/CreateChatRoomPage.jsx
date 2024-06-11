import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Apis from '../../apis/axios';
import { interestList } from '../post/data/data';
import '../../styles/chat/CreateChatRoomPage.scss';
import backButton from '../../assets/Login/interest/backButton.svg';
import addPhoto from '../../assets/post/addPhoto.svg';
import deletePhoto from '../../assets/post/delete.svg';

const CreateChatRoomPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(null);
  const [contents, setContents] = useState(null);
  const [list, setlist] = useState([]);

  const onClickInterest = (value) => {
    let updatedInterest = [];
    if (list.includes(value)) {
      updatedInterest = list.filter((arr) => arr !== value);
    } else {
      updatedInterest = [...list, value];
    }
    setlist(updatedInterest);
  };

  console.log(list)

  const [imageUrl, setImageUrl] = useState(null);
  const [preview, setPreview] = useState(null);
  const imgRef = useRef();

  const onChangeImage = (e) => {
    const file = e.target.files[0]; // 첫 번째 파일만 선택
    if (!file) {
      return;
    }

    const reader = new FileReader();
    setImageUrl(file);
    reader.onloadend = () => {
      // 이미지를 미리보기로 설정
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const onClickFileBtn = () => {
    imgRef.current.click();
  };

  const onDeleteImage = () => {
    setImageUrl(null);
    setPreview(null);
  };

  const onSubmit = async () => {
    // async 키워드 추가하여 비동기 함수로 선언
    try {
      const formData = new FormData();
      formData.append('file', imageUrl);
      formData.append(
        'chatRoomCreateRequestDto',
        new Blob(
          [
            JSON.stringify({
              title: title,
              content: contents,
              interests: list,
            }),
          ],
          { type: 'application/json' },
        ),
      );
      await Apis.post(`/api/v1/chat/create`, formData); // await 키워드를 사용하여 비동기적으로 처리
      navigate('/chatroom');
    } catch (error) {
      console.error('API 요청 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <div className="CreatePostPage_Container">
      <div className="CreatePostPage_Wrapper">
        <div className="CreatePostPage_TopBar">
          <img
            src={backButton}
            onClick={() => navigate(-1)}
            className="CreatePostPage_TopBar_Back"
          />
          <button
            className={
              !title || !contents || list.length === 0
                ? 'CreatePostPage_TopBar_DisablePost'
                : 'CreatePostPage_TopBar_Post'
            }
            onClick={onSubmit}
            disabled={!title || !contents || list.length === 0 ? true : false}
          >
            게시
          </button>
        </div>
        {/* 제목 */}
        <div className="CreatePostPage_SmallText">채팅방 제목</div>
        <div className="CreatePostPage_InputBox">
          <input
            className="CreatePostPage_Input"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* 카테고리 */}
        <div className="CreatePostPage_SmallText">카테고리</div>
        <div className="CreatePostPage_InterestBox">
          {interestList.map((item) => (
            <div
              key={item.value}
              className="CreatePostPage_Interest"
              style={{
                color: list.includes(item.value) ? '#266ED7' : '#686A8A',
              }}
              onClick={() => onClickInterest(item.value)}
            >
              {item.value}
            </div>
          ))}
        </div>
        {/* 텍스트 입력 */}
        <div className="CreatePostPage_ContentInput_Box">
          <textarea
            name="message"
            rows="5"
            cols="30"
            className="CreatePostPage_ContentInput"
            onChange={(e) => setContents(e.target.value)}
          >
            작성
          </textarea>
          {/* 이미지 렌더링 */}
          <div className="CreatePostPage_ImageList">
            {preview &&
                <div className="CreatePostPage_ImageContainer">
                  <img
                    src={deletePhoto}
                    className="CreatePostPage_DeleteImage"
                    onClick={() => onDeleteImage()}
                  />
                  <img src={preview} className="CreatePostPage_Image" />
                </div>
            }
          </div>
        </div>
        {/* 이미지 추가 */}
        <div className="CreatePostPage_InputBox" onClick={onClickFileBtn}>
          <input
            type="file"
            ref={imgRef}
            onChange={onChangeImage}
            style={{ display: 'none' }}
          />
          <div className="CreatePostPage_AddPhoto_Button">
            <img
              src={addPhoto}
              className="CreatePostPage_AddPhoto_Button_Img"
            />
            <div className="CreatePostPage_AddPhoto_Button_Text">
              채팅방 커버 이미지 추가
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChatRoomPage;