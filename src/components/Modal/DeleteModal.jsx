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
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/customAxios';

function DeleteModal({ isOpen, toggleModal, type, ID }) {
  // 삭제 대상에 따른 문구 변경 로직
  const navigate = useNavigate();
  const user = sessionStorage.getItem('accessToken');
  // const [postDelete, setPostDelete] = useState('');
  let DeleteApi = '';

  const renderRemoveInfo = () => {
    switch (type) {
      case '포스트를':
        // setPostDelete(`api/v1/post/delete/${ID}`);
        DeleteApi = `api/v1/post/delete/${ID}`;
        return '포스트가 삭제되면, 복구되지 않습니다.';
      case '채팅방을':
        DeleteApi = `api/v1/chat/delete/${ID}`;
        return '채팅방이 삭제되면, 복구되지 않습니다.';
      default: // '댓글을' 포함한 기타 경우
        DeleteApi = `api/v1/comment/delete/${ID}`;
        return '댓글이 삭제되면, 복구되지 않습니다.';
    }
  };

  const handleDelete = async () => {
    await api
      .delete(DeleteApi, {
        headers: {
          Authorization: `Bearer ${user}`,
          'Content-Type': 'application/json',
        },
      })

      .then((response) => {
        console.log('삭제', response);
        navigate('/post-page');
      })
      .catch((error) => {
        console.error('삭제', error);
      });
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
          <div className="remove" onClick={handleDelete}>
            삭제
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteModal;
