import '../../styles/component/chat/ChatList.scss';
import chattingPerson from '../../assets/svgs/chattingPerson.svg';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { useEffect, useRef, useState } from 'react';
import NoImage from '../../assets/images/NoImage.jpg';

const ChatList = () => {
  const navigate = useNavigate();
  const [chatListData, setChatListData] = useState([]);
  const [page, setPage] = useState(0);
  const obsRef = useRef(null);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    if (!isLastPage) {
      const fetchChats = async () => {
        await api
          .get('/api/v1/chat/page', {
            params: { page: page },
          })
          .then((response) => {
            const newChatRooms = response.data.data;
            if (newChatRooms.length === 0) {
              setIsLastPage(true);
            }
            setChatListData((prevChats) => [...prevChats, ...newChatRooms]);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      fetchChats();
    }
  }, [page, isLastPage]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLastPage) {
        setPage((prev) => prev + 1);
      }
    });

    if (chatListData.length && obsRef.current) {
      observer.observe(obsRef.current);
    }

    return () => {
      if (obsRef.current) {
        observer.unobserve(obsRef.current);
      }
    };
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
      {chatListData.length > 0 ? (
        chatListData.map((chat, index) => (
          <div
            className="chatItem_Container"
            key={chat.chatRoomInfo.chatRoomId}
            onClick={() => onClickedChat(chat.chatRoomInfo.chatRoomId, chat)}
            ref={index === chatListData.length - 1 ? obsRef : null}
          >
            <div className="chatItem_ProfileImg">
              <img
                onError={onErrorImg}
                src={
                  chat.chatRoomImage?.imageUrl
                    ? chat.chatRoomImage?.imageUrl
                    : NoImage
                }
                alt="채팅방 사진"
                style={{
                  width: '53px',
                  height: '53px',
                  borderRadius: '10px',
                }}
              />
            </div>
            <div className="chatInfo_Container">
              <div className="chatInfo_Title">{chat.chatRoomInfo.title}</div>
              <div className="chatInfo_Contents">
                {chat.chatRoomInfo.content}
              </div>
            </div>
            <div className="chatStats_Container">
              <img src={chattingPerson} alt="채팅 인원 아이콘" />
              {chat.chatRoomInfo.memberCount} 명
            </div>
          </div>
        ))
      ) : (
        <div className="chatList_none">채팅방이 존재하지 않습니다.</div>
      )}
      <div ref={obsRef}></div>
    </div>
  );
};

export default ChatList;
