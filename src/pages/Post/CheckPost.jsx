import { ModeEditIcon } from '../../assets/svgs/ModeEditIcon';
import { NotificationIcon } from '../../assets/svgs/NotificationIcon';
import { WestIcon } from '../../assets/svgs/WestIcon';
import { DeleteIcon } from '../../assets/svgs/DeleteIcon';
import '../../styles/pages/Post/CheckPost.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import NotificationModal from '../../components/Modal/NotificationModal';
import DeleteModal from '../../components/Modal/DeleteModal';
import PostData from './PostData';
import CommentList from './CommentList';
import TextInput from '../../components/TextInput';

//포스트 상세페이지
export default function CheckPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = { ...location.state };
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const onEditPost = () => {
    navigate(`/post-page/edit/${userInfo.postId}`, {
      state: {
        postId: `${userInfo.postId}`,
        title: `${userInfo.title}`,
        category: `${userInfo.category}`,
        content: `${userInfo.content}`,
      },
    });
  };

  const toggleNotificaionModal = () => {
    setNotificationModalOpen(!isNotificationModalOpen);
  };
  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  return (
    <div>
      <div className="Firstcontainer">
        <div className="westIcon" onClick={handleBack}>
          <WestIcon />
        </div>
        <div className="options">
          <div onClick={onEditPost}>
            <ModeEditIcon />
          </div>
          <div onClick={toggleNotificaionModal}>
            <NotificationIcon />
          </div>
          <div onClick={toggleDeleteModal}>
            <DeleteIcon />
          </div>
        </div>
      </div>
      <NotificationModal
        isOpen={isNotificationModalOpen}
        toggleModal={toggleNotificaionModal}
        type="포스트를"
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        toggleModal={toggleDeleteModal}
        type="포스트를"
      />
      <TextInput />
      <PostData userInfo={userInfo} />
      <CommentList postId={userInfo.postId} postWriter={userInfo.writerName} />
    </div>
  );
}
