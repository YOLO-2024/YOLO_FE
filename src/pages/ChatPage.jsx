import '../styles/pages/ChatPage.scss';

import ChatList from './Chat/ChatList';
import { AddIcon } from '../assets/svgs/AddIcon';
import { useNavigate } from 'react-router-dom';

export default function ChatPage() {
  const navigate = useNavigate();

  const onNewChatClick = () => {
    navigate('/chat-page/new');
  };

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
