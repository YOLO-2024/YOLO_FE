import '../../styles/component/main/recommendChat.scss';
import GroupIcon from '../../assets/svgs/GroupIcon';

const RecommendChatItem = ({ content }) => {
  return (
    <div className="recommendItem_Container">
      <div className="chatIcon_Box">
        <GroupIcon />
      </div>
      <div className="recommendTitle_Container" style={{ color: '#2176FF' }}>
        추천 단체 채팅
      </div>
      <div className="recommendTitle_Container">{content}</div>
    </div>
  );
};

export default function RecommendChatting() {
  const chatdummyList = [
    { chatroomId: 1, content: '배달비 n분의 1 할 사람~' },
    { chatroomId: 2, content: '게임 같이 할 사람~' },
    { chatroomId: 3, content: '산책 모임방' },
    { chatroomId: 4, content: '자취 꿀팁 같이 공유해요~' },
    { chatroomId: 5, content: '맛집 탐방러 모임' },
  ];

  return (
    <div className="recommendChat_Container">
      {chatdummyList.map((dummy) => (
        <RecommendChatItem key={dummy.chatroomId} content={dummy.content} />
      ))}
    </div>
  );
}
