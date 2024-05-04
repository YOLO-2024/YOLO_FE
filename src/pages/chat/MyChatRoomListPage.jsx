import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/chat/ChatRoomListPage.scss';
import Apis from '../../apis/axios';
import personCount from '../../assets/Chat/personCount.svg';
import NoImage from '../../assets/Login/NoImage.webp';

const MyChatRoomListPage = () => {
  const navigate = useNavigate();
  const [chatRoomList, setChatRoomList] = useState([]);

  useEffect(() => {
    Apis.get('/api/v1/chat/my-chat').then((response) => {
      const newChatRoom = response.data.data.map((item) => item);
      setChatRoomList((prevChatRoom) => [...prevChatRoom, ...newChatRoom]);
    });
  }, []);

  return (
    <div className="ChatRoomListPage_Container">
      <div className="ChatRoomListPage_Wrapper">
        {chatRoomList ? (
          chatRoomList.map((chatRoom, index) => (
            <div
              key={index}
              className="ChatRoomPage_ChatRoom_Wrapper"
              onClick={() =>
                navigate('/chatroom/' + chatRoom.chatRoomInfo.chatRoomId, {
                  state: { chatRoom: chatRoom },
                })
              }
            >
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
          <div>참여중인 채팅방이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default MyChatRoomListPage;