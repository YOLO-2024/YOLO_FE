import '../../styles/post/CreatePostPage.scss';
import backButton from '../../assets/Login/interest/backButton.svg';
import addPhoto from '../../assets/post/addPhoto.svg';
import deletePhoto from '../../assets/post/delete.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';
import Apis from '../../apis/axios';

const interestList = [
  {
    value: '영화',
  },
  {
    value: '라이프스타일',
  },
  {
    value: '운동',
  },
  {
    value: '예술',
  },
  {
    value: '건강',
  },
  {
    value: '음악',
  },
  {
    value: '음식',
  },
  {
    value: '게임',
  },
  {
    value: '기술',
  },
];

const CreatePostPage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState(null);
    const [contents, setContents] = useState(null);
    const [list, setlist] = useState([]);

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeContents = (e) => {
        setContents(e.target.value);
    }

    const onClickInterest = (value) => {
      let updatedInterest = [];
      if (list.includes(value)) {
        updatedInterest = list.filter((arr) => arr !== value);
      } else {
        updatedInterest = [...list, value];
      }
      setlist(updatedInterest);
    };

    const [imageUrl, setImageUrl] = useState([null]);
    const [preview, setPreview] = useState([]);
    const imgRef = useRef();

    const onChangeImage = (e) => {
      const file = e.target.files[0]; // 첫 번째 파일만 선택
      if (!file) {
        return;
      }

      const reader = new FileReader();
      setImageUrl([...imageUrl, file]);
      reader.onloadend = () => {
        // 이미지를 미리보기로 설정
        setPreview([...preview, reader.result]);
      };

      reader.readAsDataURL(file);
    };

    const onClickFileBtn = () => {
      imgRef.current.click();
    };

    const onDeleteImage = (index) => {
      const updatedImages = imageUrl.filter((image, i) => i !== index);
      const updatedPreviewImages = preview.filter((image, i) => i !== index);
      setImageUrl(updatedImages);
      setPreview(updatedPreviewImages);
    };

const onSubmit = async () => {
  // async 키워드 추가하여 비동기 함수로 선언
  try {
    const formData = new FormData();
    if(imageUrl.length > 0){
      imageUrl.forEach((file) => {
        formData.append('files', file);
      });
    } else {
      formData.append('files', null);
    }

    formData.append(
      'postCreateRequestDto',
      new Blob(
        [
          JSON.stringify({
            title: title,
            content: contents,
            categories: list,
          }),
        ],
        { type: 'application/json' },
      ),
    );
    await Apis.post(`/api/v1/post/create`, formData); // await 키워드를 사용하여 비동기적으로 처리
    navigate('/postList');
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
              className={(!title || !contents || (list.length === 0) ) ? "CreatePostPage_TopBar_DisablePost" : "CreatePostPage_TopBar_Post" }
              onClick={onSubmit}
              disabled={(!title || !contents || (list.length === 0) ) ? true : false}
              >게시</button>
          </div>
          {/* 제목 */}
          <div className="CreatePostPage_SmallText">제목</div>
          <div className="CreatePostPage_InputBox">
            <input
              className="CreatePostPage_Input"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={onChangeTitle}
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
            //   value={contents}
              onChange={onChangeContents}
            >
              작성
            </textarea>
            {/* 이미지 렌더링 */}
            <div className="CreatePostPage_ImageList">
              {preview &&
                preview.map((image, index) => (
                  <div key={index} className="CreatePostPage_ImageContainer">
                    <img
                      src={deletePhoto}
                      className="CreatePostPage_DeleteImage"
                      onClick={()=>onDeleteImage(index)}
                    />
                    <img src={image} className="CreatePostPage_Image" />
                  </div>
                ))}
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
                이미지 추가
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default CreatePostPage;