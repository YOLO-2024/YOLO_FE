import Apis from '../apis/axios';
import { useNavigate } from 'react-router-dom';
import '../styles/post/PostPage.scss';
import { useState } from 'react';

const Modal = ({actionType, type, title, body, setIsActive, id}) => {
    const navigate = useNavigate();
    const [content, setContent] = useState('');

    const onActionFilter = () => {
        if(actionType === 'Delete') {
            return type === 'POST' ? onPostDelete() : onCommentDelete();
        } else if(actionType === 'Declaration') {
            onSubmitDeclaration();
        }
    }

    const onPostDelete = () => {
      Apis.delete(`/api/v1/post/delete/${id}`)
      .then(() => {
        navigate('/postList');
      })
    };

    const onCommentDelete = () => {
        Apis.delete(`/api/v1/comment/delete/${id}`)
        .then(() => {
            setIsActive(false);
            window.location.reload();
        })
    }

    const onSubmitDeclaration = () => {
        Apis.post('/api/v1/declaration/report', {
          id: id,
          content: content,
          declarationType : type
        }).then(() => {
            alert('신고 완료되었습니다.')
            setIsActive(false)
        }).catch(err => {
            alert(err.response.data.message);
            setIsActive(false);
        })
    };

    return (
      <div className="Modal_Container">
        ß
        <div className="Modal_Wrapper">
          <div className="Modal_Title">{title}</div>
          <div className="Modal_Body">{body}</div>
          {actionType === 'Declaration' && (
            <textarea
              className="Modal_InputText"
              onChange={(e) => setContent(e.target.value)}
            />
          )}
          <div className="Modal_Button_Box">
            <button
              onClick={() => setIsActive(false)}
              className="Modal_Button_Cancle"
            >
              취소
            </button>
            <button
              className="Modal_Button_Check"
              disabled={
                actionType === 'Declartion' && content === '' ? true : false
              }
              onClick={onActionFilter}
            >
              {actionType === 'Declartion' ? '신고' : '확인'}
            </button>
          </div>
        </div>
      </div>
    );
};

export default Modal;