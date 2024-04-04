import { ModeEditIcon } from '../../assets/svgs/ModeEditIcon';
import { NotificationIcon } from '../../assets/svgs/NotificationIcon';
import { WestIcon } from '../../assets/svgs/WestIcon';
import { DeleteIcon } from '../../assets/svgs/DeleteIcon';
import '../../styles/pages/Post/CheckPost.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import NotificationModal from '../../components/Modal/NotificationModal';
import DeleteModal from '../../components/Modal/DeleteModal';

export default function CheckPost() {
  const navigate = useNavigate();
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  //   const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleNotificaionModal = () => {
    setNotificationModalOpen(!isNotificationModalOpen);
  };
  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };
  //   const toggleEditModal = () => {
  //     setEditModalOpen(!isEditModalOpen);
  //   };

  return (
    <div className="wrapper">
      <div className="first-container">
        <div onClick={handleBack}>
          <WestIcon />
        </div>
        <div className="options">
          <div>
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
      {/* <div className="last-container">
        <div className="last">
          <div
            className="comment-input"
            contentEditable="true"
            placeholder="댓글을 입력해주세요."
          />
          <div className="check">확인</div>
        </div>
      </div> */}
    </div>
  );
}
