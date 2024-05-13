import { CommentIcon } from '../../assets/svgs/CommentIcon';
import { LikeIcon } from '../../assets/svgs/LikeIcon';
import LikeWhiteIcon from '../../assets/svgs/LikeWhiteIcon';
import { ReviewIcon } from '../../assets/svgs/ReviewIcon';

import '../../styles/pages/Post/PostData.scss';

//포스트 상세페이지 내부의 포스트 정보
export default function PostData({ userInfo }) {
  console.log(userInfo.postImages);

  // console.log(profileImage);
  return (
    <div>
      <div className="postUser-container">
        {userInfo.profileImage !== null &&
        userInfo.profileImage !== undefined ? (
          <img
            className="userIcon"
            src={userInfo.profileImage}
            alt="none"
            style={{ borderRadius: '25%' }}
          />
        ) : (
          <div>none</div>
        )}

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
          {userInfo.category?.split(',').map((category, index) => (
            <span key={index}>#{category.trim()} </span>
          ))}
        </div>
      </div>

      <div className="postContent">{userInfo.content}</div>
      <div className="postImage-container">
        {userInfo.postImages &&
          userInfo.postImages.map((img, index) => (
            <img key={index} className="postImage" src={img.imageUrl} />
          ))}
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
