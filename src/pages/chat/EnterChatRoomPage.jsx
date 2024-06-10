import '../../styles/chat/EnterChatRoomPage.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Edit from '../../assets/post/Edit.svg';
import DeletePost from '../../assets/post/DeletePost.svg';
import backButton from '../../assets/Login/interest/backButton.svg';
import NoImage from '../../assets/Login/NoImage.webp';
import personCount from '../../assets/Chat/personCount.svg';
import ChatRoomValueBox from '../../component/chat/ChatRoomValueBox';
import { useEffect, useState } from 'react';
import Modal from '../../component/Modal';
import Apis from '../../apis/axios';

const EnterChatRoomPage = () => {
    const navigate = useNavigate();
    const memberState = JSON.parse(sessionStorage.getItem('memberState'));
    const [isChatDeleteActive, setIsChatDeleteActive] = useState(false)
    const { roomId } = useParams();
    const [chatRoom, setChatRoom] = useState();

    useEffect(() => {
      Apis.get('/api/v1/chat/read/' + roomId)
      .then((response) => {
        setChatRoom(response.data.data)
      })
    }, [])

    return (
      <>
        {isChatDeleteActive && (
          <Modal
            actionType="Delete"
            type="CHAT"
            title="채팅방을 삭제하시겠습니까?"
            body="채팅방이 삭제되면, 복구되지 않습니다."
            setIsActive={setIsChatDeleteActive}
            id={chatRoom.chatRoomInfo.chatRoomId}
          />
        )}
        { chatRoom &&
          <>
            <div className="EnterChatRoomPage_Header">
              <img
                src={backButton}
                className="EnterChatRoomPage_Header_Back"
                onClick={() => navigate('/chatroom')}
              />
              {chatRoom.creatorInfo.nickname ===
                memberState.profileInfo.nickname && (
                <img
                  src={Edit}
                  className="EnterChatRoomPage_Header_Edit"
                  onClick={() => navigate('/chatroom/edit/' + roomId)}
                />
              )}
              {chatRoom.creatorInfo.nickname ===
                memberState.profileInfo.nickname && (
                <img
                  src={DeletePost}
                  className="EnterChatRoomPage_Header_Delete"
                  onClick={() => {
                    setIsChatDeleteActive(true);
                  }}
                />
              )}
            </div>
            <div className="EnterChatRoomPage_Container">
              <div className="EnterChatRoomPage_Wrapper">
                <img
                  src={
                    chatRoom.chatRoomImage
                      ? chatRoom.chatRoomImage.imageUrl
                      : NoImage
                  }
                  className="EnterChatRoomPage_ChatRoomImage"
                />
                <div className="EnterChatRoomPage_ChatRoom_MemberCount">
                  <img
                    src={personCount}
                    className="EnterChatRoomPage_ChatRoom_MemberCount_Image"
                  />
                  <div className="EnterChatRoomPage_ChatRoom_MemberCount_Text">
                    {chatRoom.chatRoomInfo.memberCount}명
                  </div>
                </div>
                <ChatRoomValueBox
                  type="채팅방 제목"
                  value={chatRoom.chatRoomInfo.title}
                />
                <ChatRoomValueBox
                  type="채팅방 한 줄 소개"
                  value={chatRoom.chatRoomInfo.content}
                />
                <ChatRoomValueBox
                  type="카테고리"
                  value={chatRoom.chatRoomInfo.interests}
                />
                <ChatRoomValueBox
                  type="지역"
                  value={chatRoom.chatRoomInfo.location}
                />
                <div
                  className="EnterChatRoomPage_ChatRoom_EnterBtn"
                  onClick={() =>
                    navigate('/chatroom/' + roomId, {
                      state: { chatRoom: chatRoom },
                    })
                  }
                >
                  채팅방 입장
                </div>
              </div>
            </div>
          </>
        }
      </>
    );
};

export default EnterChatRoomPage;