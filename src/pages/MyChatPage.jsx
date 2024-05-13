import '../styles/pages/ChatPage.scss';
import MyChatList from './Chat/MyChatList';

export default function MyChatPage() {
  return (
    <div className="chat_Container">
      <MyChatList />
      채팅
    </div>
  );
}
