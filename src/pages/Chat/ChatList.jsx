import '../../styles/component/chat/ChatList.scss';
import postIcon from '../../assets/svgs/post.png';
import chattingPerson from '../../assets/svgs/chattingPerson.svg';
import { useNavigate } from 'react-router-dom';

const ChatItem = ({ chatTitle, chatContents, chatNum, onChatItemClick }) => {
  return (
    <div className="chatItem_Container" onClick={onChatItemClick}>
      <div className="chatItem_ProfileImg">
        <img
          src={postIcon}
          style={{ width: '53px', height: '53px', borderRadius: '10px' }}
        />
      </div>
      <div className="chatInfo_Container">
        <div className="chatInfo_Title">{chatTitle}</div>
        <div className="chatInfo_Contents">{chatContents}</div>
      </div>
      <div className="chatStats_Container">
        <img src={chattingPerson} />
        {chatNum} 명
      </div>
    </div>
  );
};

const ChatList = () => {
  const navigate = useNavigate();
  // const [chatData, setChatData] = useState();
  const chatdummyList = [
    {
      chatRoomId: 1,
      chatTitle: '게임할 사람 구함',
      chatContents: '게임 같이 하는 방',
      chatNum: 20,
    },
    {
      chatRoomId: 2,
      chatTitle: '배달비 n분의 1 모임',
      chatContents: '배달비 나눔 하는 방',
      chatNum: 30,
    },
    {
      chatRoomId: 3,
      chatTitle: '동네 산책방',
      chatContents: '산책 메이트 구하는 방',
      chatNum: 10,
    },
    {
      chatRoomId: 4,
      chatTitle: '오늘의 메뉴 추천 방',
      chatContents: '메뉴 추천 방',
      chatNum: 5,
    },
  ];

  const onClickedChat = (chatRoomId) => {
    navigate(`/chat-page/join/${chatRoomId}`);
  };
  return (
    <div className="chatList_Container">
      {chatdummyList.map((chat) => (
        <ChatItem
          key={chat.chatRoomId}
          chatTitle={chat.chatTitle}
          chatContents={chat.chatContents}
          chatNum={chat.chatNum}
          onChatItemClick={() => onClickedChat(chat.chatRoomId)}
        />
      ))}
    </div>
  );
};

export default ChatList;
