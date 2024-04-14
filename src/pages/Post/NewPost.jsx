import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Category from './Category';
import '../../styles/pages/Post/NewPost.scss';
import { PreviousIcon } from '../../assets/svgs/PreviousIcon';
import { AddPhoto } from '../../assets/svgs/AddPhoto';

export default function NewPost() {
  const navigate = useNavigate();
  const initialState = {
    title: '',
    content: '',
    selectedCategories: [],
  };
  const [formState, setFormState] = useState(initialState);

  const handleBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const isValidForm = () => {
    return (
      formState.title &&
      formState.content &&
      formState.selectedCategories.length > 0
    );
  };

  const setSelectedCategories = (categories) => {
    setFormState({
      ...formState,
      selectedCategories: categories,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
    setFormState(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="onPostContainer">
        <div className="previousIcon" onClick={handleBack}>
          <PreviousIcon />
        </div>
        <div
          type="submit"
          className={`{onPost ${!isValidForm() ? 'disabled' : ''}}`}
          onClick={handleSubmit}
          style={{
            background: isValidForm() ? ' #266ED7 6.68%' : '  #C2C2C2',
            width: ' 60.371px',
            height: '37px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
          }}
        >
          게시
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
        <Category setSelectedCategories={setSelectedCategories} />
      </div>
      <textarea
        name="content"
        className="Content-input"
        placeholder="내용을 입력하세요."
        value={formState.content}
        onChange={handleChange}
      />
      <div>
        <div className="addImage-container">
          <div className="AddPhoto">
            <AddPhoto />
          </div>
          <div>이미지 추가</div>
        </div>
      </div>
    </form>
  );
}
