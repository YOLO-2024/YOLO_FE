import '../styles/pages/ChatPage.scss';

import ChatList from './Chat/ChatList';
import { AddIcon } from '../assets/svgs/AddIcon';
import { useNavigate } from 'react-router-dom';

import { api } from '../utils/customAxios';

export default function ChatPage() {
  // const userToken = sessionStorage.getItem('accessToken');
  const navigate = useNavigate();

  /*
  const onClickApi = async () => {
    try {
      const dataChatRoom = await api.get('/api/v1/chat/read', {
        headers: { Authorization: `Bearer ${userToken}` }, // 토큰 넣어주기
        'Content-Type': 'application/json',
      });
      console.log(dataChatRoom);
      console.log(userToken);
      return dataChatRoom;
    } catch (error) {
      console.log(error);
    }
  };
  */

  const onNewChatClick = () => {
    navigate('/chat-page/new');
  };

  // <button onClick={onClickApi}>버튼</button>
  return (
    <div className="chat_Container">
      <ChatList />
      <div className="newChat_Container">
        <div className="newChat_Button" onClick={onNewChatClick}>
          <AddIcon />
        </div>
      </div>
    </div>
  );
}
