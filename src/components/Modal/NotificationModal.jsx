import Modal from './Modal';
import '../../styles/component/Modal/NotificationModal.scss';

function NotificationModal({ isOpen, toggleModal, type }) {
  return (
    <div>
      <Modal isOpen={isOpen} toggleModal={toggleModal}>
        <p className="question">{type} 신고하시겠습니까?</p>
        <p className="info">신고 접수 확인 후, 조치하겠습니다.</p>
        <div
          className="reason"
          contentEditable="true"
          placeholder="신고 사유를 입력해주세요."
        />
        <div className="buttonOption">
          <div className="cancle" onClick={toggleModal}>
            취소
          </div>
          <div className="remove">신고</div>
        </div>
      </Modal>
    </div>
  );
}

export default NotificationModal;
