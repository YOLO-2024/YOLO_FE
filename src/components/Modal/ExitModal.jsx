import Modal from './Modal';
import '../../styles/component/Modal/ExitModal.scss';

function EditModal({ isOpen, toggleModal }) {
  return (
    <div>
      <Modal isOpen={isOpen} toggleModal={toggleModal} size="mini">
        <p className="removeQuestion">채팅방을 퇴장 하시겠습니까?</p>
        <p className="removeInfo">
          퇴장하시고 재입장 시, <br /> 채팅 기록이 복구되지 않습니다.
        </p>

        <div className="buttonOption">
          <div className="cancle" onClick={toggleModal}>
            취소
          </div>
          <div className="remove">삭제</div>
        </div>
      </Modal>
    </div>
  );
}

export default EditModal;
