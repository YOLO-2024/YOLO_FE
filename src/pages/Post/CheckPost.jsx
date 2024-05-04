import { ModeEditIcon } from '../../assets/svgs/ModeEditIcon';
import { NotificationIcon } from '../../assets/svgs/NotificationIcon';
import { DeleteIcon } from '../../assets/svgs/DeleteIcon';
import '../../styles/pages/Post/CheckPost.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import NotificationModal from '../../components/Modal/NotificationModal';
import DeleteModal from '../../components/Modal/DeleteModal';
import CommentList from './CommentList';
import TextInput from '../../components/TextInput';
import { PreviousIcon } from '../../assets/svgs/PreviousIcon';
import defaultImage from '../../assets/images/basicProfile.jpg';
import LikeWhiteIcon from '../../assets/svgs/LikeWhiteIcon';
import { CommentIcon } from '../../assets/svgs/CommentIcon';
import { LikeIcon } from '../../assets/svgs/LikeIcon';
import { ReviewIcon } from '../../assets/svgs/ReviewIcon';
import { api } from '../../utils/customAxios';
//포스트 상세페이지
export default function CheckPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const postData = { ...location.state };
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const user = sessionStorage.getItem('accessToken');
  const writer = JSON.parse(sessionStorage.getItem('myInfo')).profileInfo
    .nickname;
  const isWriter = postData.writerInfo.nickname === writer;

  const dateFormatter = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const formattedDateTime = `${dateTime.getFullYear()}.${String(dateTime.getMonth() + 1).padStart(2, '0')}.${String(dateTime.getDate()).padStart(2, '0')} ${String(dateTime.getHours()).padStart(2, '0')}:${String(dateTime.getMinutes()).padStart(2, '0')}`;
    return formattedDateTime;
  };

  const onEditPost = () => {
    navigate(`/post-page/edit/${postData.postInfo.postId}`, {
      state: postData,
    });
  };
  console.log(postData.postImage);

  const toggleNotificaionModal = () => {
    setNotificationModalOpen(!isNotificationModalOpen);
  };
  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleLikeCount = async () => {
    await api
      .post(
        `/api/v1/post/like/${postData.postInfo.postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        console.log('포스트 좋아요', response);
      })
      .catch((error) => {
        console.log('포스트 좋아요: ', error);
      });
  };

  return (
    <div>
      <div className="Firstcontainer">
        <div className="previousIcon" onClick={() => navigate(-1)}>
          <PreviousIcon />
        </div>
        <div className="options">
          {isWriter && (
            <div onClick={onEditPost}>
              <ModeEditIcon />
            </div>
          )}
          <div onClick={toggleNotificaionModal}>
            <NotificationIcon />
          </div>
          {isWriter && (
            <div onClick={toggleDeleteModal}>
              <DeleteIcon />
            </div>
          )}
        </div>
      </div>
      <NotificationModal
        isOpen={isNotificationModalOpen}
        toggleModal={toggleNotificaionModal}
        type="포스트를"
        ID={postData.postInfo.postId}
        Content="신고"
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        toggleModal={toggleDeleteModal}
        type="포스트를"
        ID={postData.postInfo.postId}
      />
      <TextInput />
      <div className="postUser-container">
        <img
          className="userIcon"
          src={
            postData.postInfo.profileImage
              ? postData.postInfo.profileImage
              : defaultImage
          }
        />

        <div>
          <div className="postUser">{postData.writerInfo.nickname}</div>
          <div className="postCreatedAt">
            {dateFormatter(postData.postInfo.createdAt)}
          </div>
        </div>
        <div className="likeButton" onClick={handleLikeCount}>
          <LikeWhiteIcon />
          좋아요
        </div>
      </div>
      <div className="postTitle-container">
        <div className="postTitle">{postData.postInfo.title}</div>

        <div className="postCategory">
          {postData.postInfo.categories.map((category, index) => (
            <span key={index}>#{category.trim()} </span>
          ))}
        </div>
      </div>
      <div className="postContent">{postData.postInfo.content}</div>
      <div className="postImage-container">
        {postData.postImage &&
          postData.postImage.map((img, index) => (
            <img key={index} className="postImage" src={img.imageUrl} />
          ))}
      </div>
      <div className="countContainer">
        <div className="likeIcon" onClick={handleLikeCount}>
          <LikeIcon />
          {postData.postInfo.likeCount}
        </div>
        <div>
          <CommentIcon />
        </div>
        <div className="reviewIcon">
          <ReviewIcon />
          {postData.postInfo.reviewCount}
        </div>
      </div>

      <CommentList postId={postData.postId} postWriter={postData.writerName} />
    </div>
  );
}
