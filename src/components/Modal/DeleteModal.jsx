import Modal from './Modal';
import '../../styles/component/Modal/DeleteModal.scss';

function DeleteModal({ isOpen, toggleModal, type }) {
  return (
    <div>
      <Modal isOpen={isOpen} toggleModal={toggleModal} size="mini">
        <p className="removeQuestion">{type} 삭제 하시겠습니까?</p>
        <p className="removeInfo">
          {type === '포스트를' ? '포스트가' : '댓글이'} 삭제되면, 복구되지
          않습니다.
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

export default DeleteModal;
