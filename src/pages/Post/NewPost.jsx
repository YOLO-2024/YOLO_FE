import { useNavigate } from 'react-router-dom';
import { WestIcon } from '../../assets/svgs/WestIcon';
import '../../styles/pages/Post/NewPost.scss';
import Category from './Category';
import { useEffect, useState } from 'react';
import { AddPhoto } from '../../assets/svgs/AddPhoto';

export default function NewPost() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: [],
    main: '',
  });

  useEffect(() => {
    const isFormDataValid =
      formData.title.trim() !== '' &&
      formData.category.length > 0 &&
      formData.main.trim() !== '';
    setIsValid(isFormDataValid);
  }, [formData]);

  const onClick = () => {
    navigate('/post-page');
  };

  const handleChange = (e) => {
    const name = e.currentTarget.getAttribute('data-name');
    const value = e.currentTarget.textContent;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCategorySelect = (selectedCategories) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: selectedCategories,
    }));
  };

  const onPost = () => {
    if (isValid) console.log(formData);
    else console.log('비활성화');
  };
  //className="wrapper"
  return (
    <div className="postWrapper">
      <div className="first-container">
        <div className="westIcon" onClick={onClick}>
          <WestIcon />
        </div>
        <div
          className={`onPost ${!isValid ? 'disabled' : ''}`}
          onClick={onPost}
        >
          게시
        </div>
      </div>
      <div className="title-container">
        <div className="title">제목</div>

        <div
          className="title-input"
          contentEditable="true"
          placeholder="제목을 입력해주세요."
          data-name="title"
          onInput={handleChange}
        ></div>
      </div>

      <div>
        <div className="category">카테고리</div>
        <div className="categories">
          <Category onCategorySelect={handleCategorySelect} />
        </div>
      </div>
      <div
        className="main-input"
        contentEditable="true"
        placeholder="내용을 입력해주세요."
        data-name="main"
        onInput={handleChange}
      ></div>
      <div className="image-container">
        <AddPhoto />
        <div>이미지 추가</div>
      </div>
    </div>
  );
}
