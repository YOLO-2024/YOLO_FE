import '../../styles/component/chat/ChatList.scss';
import chattingPerson from '../../assets/svgs/chattingPerson.svg';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { useEffect, useState } from 'react';
import NoImage from '../../assets/images/NoImage.webp';

const MyChatList = () => {
  const navigate = useNavigate();
  const [chatListData, setChatListData] = useState([]);

  useEffect(() => {
    const getChatListData = async () => {
      try {
        const res = await api.get('/api/v1/chat/my-chat');
        setChatListData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getChatListData();
  }, []);

  const onErrorImg = (e) => {
    e.target.src = NoImage;
  };

  return (
    <div>
      <div className="chatList_Container">
        {chatListData.data && chatListData.data.length > 0 ? (
          chatListData.data.map((chat, index) => (
            <div
              key={index}
              className="chatItem_Container"
              onClick={() =>
                navigate('/chat-page/' + chat.chatRoomInfo.chatRoomId, {
                  state: { chatRoom: chat },
                })
              }
            >
              <div className="chatItem_ProfileImg">
                <img
                  onError={onErrorImg}
                  src={
                    chat.chatRoomImage?.imageUrl
                      ? chat.chatRoomImage?.imageUrl
                      : NoImage
                  }
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
                <img src={chattingPerson} />
                {chat.chatRoomInfo.memberCount} 명
              </div>
            </div>
          ))
        ) : (
          <div className="chatList_none">채팅방이 존재하지 않습니다.</div>
        )}
      </div>
    </div>
  );
};

export default MyChatList;
