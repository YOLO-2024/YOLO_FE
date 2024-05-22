import '../../styles/component/chat/ChatList.scss';
import chattingPerson from '../../assets/svgs/chattingPerson.svg';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { useEffect, useRef, useState } from 'react';
import NoImage from '../../assets/images/NoImage.webp';

const ChatList = () => {
  const navigate = useNavigate();
  const [chatListData, setChatListData] = useState([]);
  const [page, setPage] = useState(0);

  const endRef = useRef(null);

  useEffect(() => {
    api
      .get('/api/v1/chat/page', {
        params: { page: page },
      })
      .then((response) => {
        const newChatRoom = response.data.data.map((item) => item);
        setChatListData((prevChatRoom) => [...prevChatRoom, ...newChatRoom]);
      });
  }, [page]);

  const observer = useRef(); // Intersection Observer 객체를 저장할 ref

  useEffect(() => {
    // Intersection Observer 콜백 함수
    const handleIntersection = (entries) => {
      const target = entries[0]; // 감지된 엘리먼트
      if (target.isIntersecting) {
        // 엘리먼트가 화면에 보이면
        console.log('등장');
        console.log(chatListData);
        setPage((prevPage) => prevPage + 1); // 페이지 수 증가
      }
    };

    // Intersection Observer 생성
    observer.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // 엘리먼트가 화면에 50% 이상 보이면 감지
    });

    if (endRef.current) {
      observer.current.observe(endRef.current);
    }

    return () => {
      // 컴포넌트가 언마운트되면 Intersection Observer 해제
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [endRef]);

  useEffect(() => {
    console.log(chatListData);
  }, [chatListData]);

  const onClickedChat = (chatRoomId, chatRoomData) => {
    console.log(chatRoomData);
    navigate(`/chat-page/join/${chatRoomId}`, { state: { chatRoomData } });
  };

  const onErrorImg = (e) => {
    e.target.src = NoImage;
  };

  return (
    <div className="chatList_Container">
      {chatListData ? (
        chatListData.map((chat, index) => (
          <div
            key={index}
            className="chatItem_Container"
            onClick={() => onClickedChat(chat.chatRoomInfo.chatRoomId, chat)}
          >
            <div className="chatItem_ProfileImg">
              <img
                onError={onErrorImg}
                src={
                  chat.chatRoomImage?.imageUrl
                    ? chat.chatRoomImage?.imageUrl
                    : NoImage
                }
                style={{ width: '53px', height: '53px', borderRadius: '10px' }}
              />
            </div>
            <div className="chatInfo_Container">
              <div className="chatInfo_Title">{chat.chatRoomInfo.title}</div>
              <div className="chatInfo_Contents">
                {chat.chatRoomInfo.content}
              </div>
            </div>
            <div className="chatStats_Container">
              <img src={chattingPerson} />
              {chat.chatRoomInfo.memberCount} 명
            </div>
          </div>
        ))
      ) : (
        <div>채팅방이 존재하지 않습니다.</div>
      )}
      <div ref={endRef}></div>
    </div>
  );
};

export default ChatList;
