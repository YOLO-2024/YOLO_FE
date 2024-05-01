/*
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
*/

import Modal from './Modal';
import '../../styles/component/Modal/DeleteModal.scss';

function DeleteModal({ isOpen, toggleModal, type }) {
  // 삭제 대상에 따른 문구 변경 로직
  const renderRemoveInfo = () => {
    switch (type) {
      case '포스트를':
        return '포스트가 삭제되면, 복구되지 않습니다.';
      case '채팅방을':
        return '채팅방이 삭제되면, 복구되지 않습니다.';
      default: // '댓글을' 포함한 기타 경우
        return '댓글이 삭제되면, 복구되지 않습니다.';
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggleModal={toggleModal} size="mini">
        <p className="removeQuestion">{type} 삭제 하시겠습니까?</p>
        <p className="removeInfo">{renderRemoveInfo()}</p>

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
