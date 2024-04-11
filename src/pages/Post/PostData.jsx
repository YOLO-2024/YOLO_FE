import { CommentIcon } from '../../assets/svgs/CommentIcon';
import { LikeIcon } from '../../assets/svgs/LikeIcon';
import LikeWhiteIcon from '../../assets/svgs/LikeWhiteIcon';
import { ReviewIcon } from '../../assets/svgs/ReviewIcon';
import postIcon from '../../assets/svgs/post.png';
import '../../styles/pages/Post/PostData.scss';

//포스트 상세페이지 내부의 포스트 정보
export default function PostData({ userInfo }) {
  return (
    <div>
      <div className="postUser-container">
        <img
          className="userIcon"
          src={postIcon}
          alt="post image"
          style={{ borderRadius: '25%' }}
        />
        <div>
          <div className="postUser">{userInfo.writerName}</div>
          <div className="postCreatedAt">{userInfo.createdAt}</div>
        </div>
        <div className="likeButton">
          <LikeWhiteIcon />
          좋아요
        </div>
      </div>

      <div className="postTitle-container">
        <div className="postTitle">{userInfo.title}</div>

        <div className="postCategory">
          {userInfo.category.split(',').map((category, index) => (
            <span key={index}>#{category.trim()} </span>
          ))}
        </div>
      </div>

      <div className="postContent">{userInfo.content}</div>
      <div className="postImage-container">
        {/* {userInfo.images.map((image, index) => (
          <img
            className="postImage"
            key={index}
            src={image.imageUrl}
            alt={`Image${index}`}
          />
        ))} */}
        <img className="postImage" src={postIcon} alt="postImage" />
      </div>
      <div className="countContainer">
        <div className="likeIcon">
          <LikeIcon />
          {userInfo.likeCount}
        </div>
        <div>
          <CommentIcon />
        </div>
        <div className="reviewIcon">
          <ReviewIcon />
          {userInfo.reviewCount}
        </div>
      </div>
    </div>
  );
}
