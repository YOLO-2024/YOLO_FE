import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/chat/ChatRoomListPage.scss';
import Apis from '../../apis/axios';
import add from '../../assets/post/add.svg';
import personCount from '../../assets/Chat/personCount.svg';
import NoImage from '../../assets/Login/NoImage.webp';

const ChatRoomListPage = () => {
  const navigate = useNavigate();
  const [chatRoomList, setChatRoomList] = useState([]);
  const [page, setPage] = useState(0);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });
    // 최하단 요소를 관찰 대상으로 지정함
    const observerTarget = document.getElementById('observer');
    // 관찰 시작
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, []);

  useEffect(() => {
    Apis.get('/api/v1/chat/page', {
      params: { page: page },
    }).then((response) => {
      const newChatRoom = response.data.data.map((item) => item);
      setChatRoomList((prevChatRoom) => [...prevChatRoom, ...newChatRoom]);
    });
  }, [page]);

  console.log(chatRoomList);

  return (
    <div className="ChatRoomListPage_Container">
      <div className="ChatRoomListPage_Wrapper">
        {chatRoomList ? (
          chatRoomList.map((chatRoom, index) => (
            <div key={index} className="ChatRoomPage_ChatRoom_Wrapper">
              {/* 이미지 */}
              <div className="ChatRoomListPage_ChatRoom_Image_Box">
                <img
                  src={
                    chatRoom.chatRoomImage !== null
                      ? chatRoom.chatRoomImage.imageUrl
                      : NoImage
                  }
                  className="ChatRoomListPage_ChatRoom_Image"
                />
              </div>
              <div className="ChatRoomPage_ChatRoom_Content_Box">
                <div className="ChatRoomPage_ChatRoom_Content_First">
                  <div className="ChatRoomPage_ChatRoom_Content_Title">
                    {chatRoom.chatRoomInfo.title}
                  </div>
                </div>
                <div className="ChatRoomPage_ChatRoom_Content_Second">
                  {chatRoom.chatRoomInfo.content}
                </div>
                <div className="ChatRoomPage_ChatRoom_Count">
                  <img
                    src={personCount}
                    className="ChatRoomPage_ChatRoom_Count_Icon"
                  />
                  <div className="ChatRoomPage_ChatRoom_Count_Text">
                    {chatRoom.chatRoomInfo.memberCount}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>등록된 채팅방이 없습니다.</div>
        )}
        <div id="observer" style={{ height: '10px', border: 'none' }}></div>
      </div>
      <div
        className="ChatRoomPage_CreateButton"
        onClick={() => navigate('/chatroom/create')}
      >
        <img src={add} className="ChatRoomPage_CreateButton_Icon" />
      </div>
    </div>
  );
};

export default ChatRoomListPage;
