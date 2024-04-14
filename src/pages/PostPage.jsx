import { useNavigate } from 'react-router-dom';
import { AddIcon } from '../assets/svgs/AddIcon';
import '../styles/pages/PostPage.scss';
import PostList from './Post/PostList';

export default function PostPage() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/post-page/new');
  };

  return (
    <>
      <PostList />
      <div className="buttonContainer">
        <div className="new" onClick={onClick}>
          <AddIcon />
        </div>
      </div>
    </>
  );
}
