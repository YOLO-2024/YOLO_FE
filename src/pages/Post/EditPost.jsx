import { useState } from 'react';
import '../../styles/pages/Post/EditPost.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import Category from './Category';
import { AddPhoto } from '../../assets/svgs/AddPhoto';
import { PreviousIcon } from '../../assets/svgs/PreviousIcon';

export default function EditPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const postInfo = { ...location.state };
  const categoriesArray = postInfo.category.split(',');

  const editState = {
    title: postInfo.title,
    content: postInfo.content,
    selectedCategories: categoriesArray,
  };
  const [formState, setFormState] = useState(editState);
  const handleBack = () => {
    navigate(-1);
  };

  const isValidForm = () => {
    return (
      formState.title &&
      formState.content &&
      formState.selectedCategories.length > 0
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const setSelectedCategories = (categories) => {
    setFormState({
      ...formState,
      selectedCategories: categories,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidForm) console.log(formState);
    else console.log('비활성화');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="onEditContainer">
        <div className="previousIcon" onClick={handleBack}>
          <PreviousIcon />
        </div>
        <div
          className="EditButton"
          type="submit"
          onClick={handleSubmit}
          style={{
            background: isValidForm() ? ' #266ED7 6.68%' : ' #4D8AEB 99.25%',
          }}
        >
          수정
        </div>
      </div>
      <div className="Title-container">
        <div className="Title-label">제목</div>
        <input
          name="title"
          className="Title-input"
          placeholder="제목을 입력해주세요."
          value={formState.title}
          onChange={handleChange}
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
        className="content-input"
        placeholder="내용을 입력하세요."
        value={formState.content}
        onChange={handleChange}
      />

      <div className="addImage-container">
        <div className="AddPhoto">
          <AddPhoto />
        </div>
        <div>이미지 추가</div>
      </div>
    </form>
  );
}
