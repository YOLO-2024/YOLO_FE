import { useNavigate } from 'react-router-dom';
import { AddIcon } from '../assets/svgs/AddIcon';
import '../styles/pages/PostPage.scss';

export default function PostPage() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/post-page/new');
  };
  const onCheck = () => {
    navigate('/post-page/check');
  };
  return (
    <div className="wrapper">
      <div onClick={onCheck}>포스트 확인</div>
      <div className="new" onClick={onClick}>
        <AddIcon />
      </div>
    </div>
  );
}
