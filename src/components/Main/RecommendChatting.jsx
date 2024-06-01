import '../../styles/component/main/recommendChat.scss';
import GroupIcon from '../../assets/svgs/GroupIcon';
import { useState, useEffect, useRef } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const RecommendChatItem = ({ title, isActive, chatroomId, data }) => {
  const navigate = useNavigate();

  const onClickedRecommendChat = () => {
    console.log(chatroomId);
    navigate(`/chat-page/join/${chatroomId}`, {
      state: { chatRoomData: data },
    });
  };
  return (
    <>
      <div
        className={`recommendItem_Container ${isActive ? 'active' : ''}`}
        onClick={onClickedRecommendChat}
      >
        <div className="chatIcon_Box">
          <GroupIcon />
        </div>
        <div className="recommendTitle_Container" style={{ color: '#2176FF' }}>
          추천 단체 채팅
        </div>
        <div className="recommendTitle_Container">{title}</div>
      </div>
    </>
  );
};

export default function RecommendChatting() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const [recommendChatList, setRecommendChatList] = useState([]);

  useEffect(() => {
    const getRecommendedChat = async () => {
      try {
        const recommendedChatList = await api.get('/api/v1/chat/location-chat');
        console.log(recommendedChatList.data.data);
        setRecommendChatList(recommendedChatList.data.data);
        console.log(recommendChatList);
      } catch (error) {
        console.log(error);
      }
    };
    getRecommendedChat();
  }, []);
  useEffect(() => {
    console.log(recommendChatList);
  }, [recommendChatList]);

  useEffect(() => {
    const handleScroll = () => {
      const { current: container } = containerRef;
      const children = Array.from(container.children);

      const visibleChild = children.findIndex((child) => {
        const { left, right } = child.getBoundingClientRect();
        const { innerWidth } = window;
        return left >= 0 && right <= innerWidth;
      });

      if (visibleChild !== -1) {
        setActiveIndex(visibleChild);
      }
    };

    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        marginTop: '15px',
      }}
    >
      <div ref={containerRef} className="recommendChat_Container">
        {recommendChatList.length === 0 ? (
          <RecommendChatItem
            title="추천 단체 채팅방이 존재하지 않습니다."
            isActive={false}
            chatroomId={null}
            data={null}
          />
        ) : (
          recommendChatList.map((chat, index) => (
            <RecommendChatItem
              key={index}
              title={chat.chatRoomInfo.title}
              isActive={index === activeIndex}
              chatroomId={chat.chatRoomInfo.chatRoomId}
              data={chat}
            />
          ))
        )}
      </div>
      <div className="carousel_pagination">
        {recommendChatList.length > 0 &&
          recommendChatList.map((_, index) => (
            <div
              key={index}
              className={`carousel_circle ${index === activeIndex ? 'active' : ''}`}
            ></div>
          ))}
      </div>
    </div>
  );
}
