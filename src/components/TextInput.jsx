import { useState } from 'react';
import '../styles/component/TextInput.scss';
// import TextInputBox from '../assets/svgs/TextInputBox';

export default function TextInput() {
  const [isValid, setIsValid] = useState(false);
  const [comment, setComment] = useState('');
  const handleChange = (e) => {
    const newComment = e.target.value;
    setComment(newComment);
    if (newComment.length > 0) setIsValid(true);
    else setIsValid(false);
  };

  const handleCheck = () => {
    if (isValid) console.log(comment);
    else console.log('비활성화');
  };

  return (
    <div className="textContainer">
      <textarea
        className="comment-input"
        placeholder="댓글을 입력해주세요."
        onChange={handleChange}
        value={comment}
      />
      <div
        className="Textcheck"
        onClick={handleCheck}
        style={{
          background: isValid ? ' #266ED7 6.68%' : '#4D8AEB 99.25%',
        }}
      >
        확인
      </div>
    </div>
  );
}
