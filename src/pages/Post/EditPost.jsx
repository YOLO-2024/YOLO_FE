import { useEffect, useState } from 'react';
import { WestIcon } from '../../assets/svgs/WestIcon';
import { useNavigate, useLocation } from 'react-router-dom';
import Category from './Category';
import { AddPhoto } from '../../assets/svgs/AddPhoto';

export default function EditPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const postInfo = { ...location.state };
  const [isValid, setIsValid] = useState(false);
  console.log(postInfo.category);
  const [formData, setFormData] = useState({
    title: postInfo.title || '',
    category: postInfo.category || '',
    content: postInfo.content || '',
  });

  const onEdit = () => {
    if (isValid) console.log(formData);
    else console.log('비활성화');
  };

  useEffect(() => {
    const isFormDataValid =
      formData.title.trim() !== '' &&
      formData.category.length > 0 &&
      formData.content.trim() !== '';
    setIsValid(isFormDataValid);
  }, [formData]);

  const handleChange = (e) => {
    const name = e.currentTarget.getAttribute('data-name');
    const value = e.currentTarget.textContent;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="first-container" style={{ paddingTop: '1%' }}>
        <div className="westIcon" onClick={onClick}>
          <WestIcon />
        </div>
        <div
          className={`onPost ${!isValid ? 'disabled' : ''}`}
          onClick={onEdit}
        >
          수정
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
        >
          {postInfo.title}
        </div>
        <div>
          <div className="category">카테고리</div>
          <div className="categories">
            <Category
              onCategorySelect={(selected) =>
                setFormData({ ...formData, category: selected })
              }
              selectedCategories={formData.category}
            />
          </div>
        </div>
        <div
          className="mainInput"
          contentEditable="true"
          placeholder="내용을 입력해주세요."
          data-name="content"
          onInput={handleChange}
        >
          {postInfo.content}
        </div>
        <div className="image-container">
          <AddPhoto />
          <div>이미지 추가</div>
        </div>
      </div>
    </div>
  );
}
