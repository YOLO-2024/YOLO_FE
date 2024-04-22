import '../styles/pages/ChatPage.scss';
import { accessTokenState } from '../state/AuthState';
import { useRecoilValue } from 'recoil';
import ChatList from './Chat/ChatList';
import { AddIcon } from '../assets/svgs/AddIcon';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ChatPage() {
  const userToken = useRecoilValue(accessTokenState);
  const navigate = useNavigate();

  const onClickApi = async () => {
    try {
      const dataChatRoom = await axios.get(
        `${import.meta.env.VITE_CLIENT_URL}/api/v1/chat/read`,
        {
          headers: { Authorization: `Bearer ` + userToken }, // 토큰 넣어주기
          'Content-Type': 'application/json',
        },
      );
      console.log(dataChatRoom);
      console.log(userToken);
      return dataChatRoom;
    } catch (error) {
      console.log(error);
    }
  };

  const onNewChatClick = () => {
    navigate('/chat-page/new');
  };

  return (
    <div className="chat_Container">
      <ChatList />
      <button onClick={onClickApi}>버튼</button>
      <div className="newChat_Container">
        <div className="newChat_Button" onClick={onNewChatClick}>
          <AddIcon />
        </div>
      </div>
    </div>
  );
}
