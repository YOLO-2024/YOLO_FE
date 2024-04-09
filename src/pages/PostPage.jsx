import { useNavigate } from 'react-router-dom';
import { AddIcon } from '../assets/svgs/AddIcon';
import '../styles/pages/PostPage.scss';
import DummyList from './Post/DummyList';

export default function PostPage() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/post-page/new');
  };

  return (
    <div>
      <DummyList />
      <div className="new" onClick={onClick}>
        <AddIcon />
      </div>
    </div>
  );
}
