import '../styles/component/TextInput.scss';

export default function TextInput() {
  return (
    <div className="textContainer">
      <div
        className="comment-input"
        contentEditable="true"
        placeholder="댓글을 입력해주세요."
      />
      <div className="check">확인</div>
    </div>
  );
}
