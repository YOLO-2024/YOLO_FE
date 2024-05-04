import Modal from './Modal';
import '../../styles/component/Modal/NotificationModal.scss';
import { api } from '../../utils/customAxios';

function NotificationModal({ isOpen, toggleModal, type, ID, Content }) {
  const user = sessionStorage.getItem('accessToken');
  const handleNotification = async () => {
    // const formData = new FormData();
    console.log(Content);
    await api
      .post(
        'api/v1/declaration/report',
        { id: ID, content: Content, declarationType: 'POST' },
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        },
      )
      .then((response) => console.log('신고 ', response))
      .catch((error) => console.log('신고 ', error));
  };
  return (
    <div>
      <Modal isOpen={isOpen} toggleModal={toggleModal}>
        <p className="notificationQuestion">{type} 신고하시겠습니까?</p>
        <p className="notificationInfo">신고 접수 확인 후, 조치하겠습니다.</p>
        <div
          className="reason"
          contentEditable="true"
          placeholder="신고 사유를 입력해주세요."
        />
        <div className="buttonOption">
          <div className="cancle" onClick={toggleModal}>
            취소
          </div>
          <div className="remove" onClick={handleNotification}>
            신고
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default NotificationModal;
