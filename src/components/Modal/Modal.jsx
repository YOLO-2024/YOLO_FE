import '../../styles/component/Modal/Modal.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const Modal = ({ actionType, type, title, body, setIsActive, id }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const user = sessionStorage.getItem('accessToken');

  const onActionFilter = () => {
    if (actionType === 'Delete') {
      if (type === 'CHATD') return onChatRoomDelete();
      else if (type === 'CHATE') return onChatRoomExit();
      else if (type === 'MEMBER') return onMemberDelete();
      return type === 'POST' ? onPostDelete() : onCommentDelete();
    } else if (actionType === 'Declaration') {
      type === 'CHAT' ? onChatRoomDeclaration() : onSubmitDeclaration();
    }
  };

  const onChatRoomDelete = async () => {
    await api
      .delete(`/api/v1/chat/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${user}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);

        navigate('/chat-page');
      })
      .catch((error) => console.log(error));
  };

  const onChatRoomExit = async () => {
    await api
      .delete(`/api/v1/chat/exit/${id}`, {
        headers: {
          Authorization: `Bearer ${user}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);

        navigate('/chat-page');
      })
      .catch((error) => console.log(error));
  };

  const onChatRoomDeclaration = async () => {
    await api
      .post(
        'api/v1/declaration/report',
        { id: id, content: content, declarationType: 'CHAT' },
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        },
      )
      .then((response) => {
        console.log('채팅방 신고 ', response);
        setIsActive(false);
      })
      .catch((error) => {
        alert('이미 신고 완료된 채팅방 입니다.');
        setIsActive(false);
        console.log('채팅방 신고 ', error);
      });
  };

  const onMemberDelete = async () => {
    await api
      .delete('/api/v1/auth/resign', {
        headers: {
          Authorization: `Bearer ${user}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        navigate('/login');
      })
      .catch((error) => console.log(error));
  };

  const onPostDelete = () => {
    api
      .delete(`api/v1/post/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${user}`,
          'Content-Type': 'application/json',
        },
      })

      .then((response) => {
        console.log('삭제', response);
        navigate('/post-page');
      })
      .catch((error) => console.error('삭제', error));
  };

  const onCommentDelete = () => {
    api
      .delete(`api/v1/comment/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${user}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        setIsActive(false);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const onSubmitDeclaration = async () => {
    await api
      .post(
        'api/v1/declaration/report',
        { id: id, content: content, declarationType: 'POST' },
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        },
      )
      .then((response) => {
        console.log('포스트 신고 ', response);
        setIsActive(false);
      })
      .catch((error) => console.log('포스트 신고 ', error));
  };

  return (
    <div className="modal-Container">
      <div className="modal-Wrapper">
        <div className="modal-Title">{title}</div>
        <div className="modal-Body">{body}</div>
        {actionType === 'Declaration' && (
          <textarea
            className="modal-InputReason"
            onChange={(e) => setContent(e.target.value)}
          />
        )}

        <div className="modal-Button">
          <button
            onClick={() => setIsActive(false)}
            className="modal-CancleButton"
          >
            취소
          </button>
          <button
            className="modal-CheckButton"
            disabled={
              actionType === 'Declariont' && content === '' ? true : false
            }
            onClick={onActionFilter}
          >
            {actionType === 'Declaration' ? '신고' : '확인'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
