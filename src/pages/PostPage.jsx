import { useNavigate } from 'react-router-dom';
import { AddIcon } from '../assets/svgs/AddIcon';
import '../styles/pages/PostPage.scss';

export default function PostPage() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/post-page/new');
  };
  return (
    <div className="wrapper">
      <div>포스트 페이지</div>
      <div className="new" onClick={onClick}>
        <AddIcon />
      </div>
    </div>
  );
}
