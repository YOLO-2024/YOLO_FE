import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Category from '../Post/Category';
import '../../styles/pages/Post/NewPost.scss';
import { PreviousIcon } from '../../assets/svgs/PreviousIcon';
import { AddPhoto } from '../../assets/svgs/AddPhoto';
import { useForm } from 'react-hook-form';

export default function CreateChat() {
  const navigate = useNavigate();
  const initialState = {
    title: '',
    content: '',
    selectedCategories: [],
  };
  const { register, handleSubmit } = useForm();
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

  /*
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
    setFormState(initialState);
  };
*/
  const handleAddImg = () => {
    console.log('clicked');
  };

  return (
    <>
      <div className="onPostContainer">
        <div className="previousIcon" onClick={handleBack}>
          <PreviousIcon />
        </div>
        <input
          type="submit"
          value="등록"
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
          onChange={handleChange}
          {...register('title')}
        />
      </div>
      <div className="Category-container">
        <div className="Category-label">카테고리</div>
        <Category setSelectedCategories={setSelectedCategories} />
      </div>
      <input
        name="content"
        className="Content-input"
        placeholder="채팅방에 대한 소개를 작성해주세요."
        onChange={handleChange}
        {...register('content')}
      />
      <div>
        <div className="addImage-container" onClick={handleAddImg}>
          <div className="AddPhoto">
            <AddPhoto />
          </div>
          <div>채팅방 커버 이미지 추가</div>
        </div>
      </div>
    </>
  );
}
