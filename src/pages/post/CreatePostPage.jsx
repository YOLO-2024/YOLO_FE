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
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
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

    const [imageUrl, setImageUrl] = useState([]);
    const [preview, setPreview] = useState([]);
    const imgRef = useRef();

    const onChangeImage = (e) => {
      const file = e.target.files[0]; // 첫 번째 파일만 선택
      if (!file) return;

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
      console.log(index)
      const updatedImages = imageUrl.filter((image, i) => i !== index);
      const updatedPreviewImages = preview.filter((image, i) => i !== index);
      setImageUrl(updatedImages);
      setPreview(updatedPreviewImages);
    };

    console.log(imageUrl)


    const onSubmit = () => {
    const formData = new FormData();
    const dto = {
        title: title,
        content: contents,
        categories: list,
    };
  
    imageUrl.forEach((file) => {
      formData.append('files', file);
    });
    formData.append(
      'postCreateRequestDto',
      new Blob([JSON.stringify(dto)], { type: 'application/json' }),
    );


    Apis.post(`/api/v1/post/create`, formData)
        .then((response) => {
        // 성공적으로 요청을 보낸 후의 작업 수행
        navigate('/postList');
        })
        .catch((error) => {
        // 요청 실패 시 에러 처리
        console.error('Error creating post:', error);
        });
    }

    return (
      <div className="CreatePostPage_Container">
        <div className="CreatePostPage_Wrapper">
          <div className="CreatePostPage_TopBar">
            <img
              src={backButton}
              onClick={() => navigate(-1)}
              className="CreatePostPage_TopBar_Back"
            />
            <button className="CreatePostPage_TopBar_Post" onClick={onSubmit}>게시</button>
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