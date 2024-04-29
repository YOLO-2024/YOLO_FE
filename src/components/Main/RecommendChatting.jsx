import '../../styles/component/main/recommendChat.scss';
import GroupIcon from '../../assets/svgs/GroupIcon';
// import { useState } from 'react';
import { useState, useEffect, useRef } from 'react';

const RecommendChatItem = ({ content, isActive }) => {
  return (
    <>
      <div className={`recommendItem_Container ${isActive ? 'active' : ''}`}>
        <div className="chatIcon_Box">
          <GroupIcon />
        </div>
        <div className="recommendTitle_Container" style={{ color: '#2176FF' }}>
          추천 단체 채팅
        </div>
        <div className="recommendTitle_Container">{content}</div>
      </div>
    </>
  );
};

export default function RecommendChatting() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const chatdummyList = [
    { chatroomId: 1, content: '배달비 n분의 1 할 사람~' },
    { chatroomId: 2, content: '게임 같이 할 사람~' },
    { chatroomId: 3, content: '산책 모임방' },
    { chatroomId: 4, content: '자취 꿀팁 같이 공유해요~' },
    { chatroomId: 5, content: '맛집 탐방러 모임' },
  ];

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
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
      <div ref={containerRef} className="recommendChat_Container">
        {chatdummyList.map((dummy) => (
          <RecommendChatItem key={dummy.chatroomId} content={dummy.content} />
        ))}
      </div>
      <div className="carousel_pagination">
        {chatdummyList.map((_, index) => (
          <div
            key={index}
            className={`carousel_circle ${index === activeIndex ? 'active' : ''}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
