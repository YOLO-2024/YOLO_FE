import Dummy from './Dummy.json';
import '../../styles/pages/Post/PostList.scss';
import postIcon from '../../assets/svgs/post.png';
import { CommentIcon } from '../../assets/svgs/CommentIcon';
import { LikeIcon } from '../../assets/svgs/LikeIcon';
import { ReviewIcon } from '../../assets/svgs/ReviewIcon';
import { useNavigate } from 'react-router-dom';

//포스트 페이지 나열 컴포넌트
export default function PostList() {
  const navigate = useNavigate();

  const onCheck = ({ item }) => {
    navigate(`/post-page/check/${item.postId}`, {
      state: {
        postId: `${item.postId}`,
        writerName: `${item.writer.writer}`,
        title: `${item.title}`,
        createdAt: `${item.createdAt}`,
        category: `${item.categories}`,
        content: `${item.content}`,
        likeCount: `${item.likeCount}`,
        reviewCount: `${item.reviewCount}`,
        images: `${item.images}`,
      },
    });
  };
  return (
    <div className="PostList">
      {Dummy.data.map((item) => (
        <div
          className="postId"
          key={item.postId}
          onClick={() => onCheck({ item })}
        >
          {/* <div className="postIcon">{item.images.imageUrl}</div> */}
          <img className="postIcon" src={postIcon} alt="post image" />
          <div>
            <div className="firstContainer">
              <div className="postTitle">{item.title}</div>
              <div className="postCreatedAt">{item.createdAt}</div>
            </div>
            <div className="postContents">{item.content}</div>
            <div className="lastContainer">
              <div>
                <LikeIcon />
                {item.likeCount}
              </div>
              <div>
                <CommentIcon />
              </div>
              <div>
                <ReviewIcon />
                {item.reviewCount}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
