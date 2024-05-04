import '../../styles/chat/EnterChatRoomPage.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import Edit from '../../assets/post/Edit.svg';
import DeletePost from '../../assets/post/DeletePost.svg';
import backButton from '../../assets/Login/interest/backButton.svg';
import NoImage from '../../assets/Login/NoImage.webp';
import personCount from '../../assets/Chat/personCount.svg';
import ChatRoomValueBox from '../../component/chat/ChatRoomValueBox';

const EnterChatRoomPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const memberState = JSON.parse(sessionStorage.getItem('memberState'));
    console.log(memberState);
    console.log(state);

    return (
      <>
        <div className="EnterChatRoomPage_Header">
          <img
            src={backButton}
            className="EnterChatRoomPage_Header_Back"
            onClick={() => navigate('/chatroom')}
          />
          {state.chatRoom.creatorInfo.nickname ===
            memberState.profileInfo.nickname && (
            <img
              src={Edit}
              className="EnterChatRoomPage_Header_Edit"
              onClick={() =>
                navigate(
                  '/chatroom/edit/' + state.chatRoom.chatRoomInfo.chatRoomId,
                  {
                    state: { chatRoom: state },
                  },
                )
              }
            />
          )}
          {state.chatRoom.creatorInfo.nickname ===
            memberState.profileInfo.nickname && (
            <img
              src={DeletePost}
              className="EnterChatRoomPage_Header_Delete"
              onClick={() => {}}
            />
          )}
        </div>
        <div className="EnterChatRoomPage_Container">
          <div className="EnterChatRoomPage_Wrapper">
            <img
              src={
                state.chatRoom.chatRoomImage
                  ? state.chatRoom.chatRoomImage.imageUrl
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
                {state.chatRoom.chatRoomInfo.memberCount}명
              </div>
            </div>
            <ChatRoomValueBox
              type="채팅방 제목"
              value={state.chatRoom.chatRoomInfo.title}
            />
            <ChatRoomValueBox
              type="채팅방 한 줄 소개"
              value={state.chatRoom.chatRoomInfo.content}
            />
            <ChatRoomValueBox
              type="카테고리"
              value={state.chatRoom.chatRoomInfo.interests}
            />
            <ChatRoomValueBox
              type="지역"
              value={state.chatRoom.chatRoomInfo.location}
            />
            <div
              className="EnterChatRoomPage_ChatRoom_EnterBtn"
              onClick={() =>
                navigate(
                  '/chatroom/' + state.chatRoom.chatRoomInfo.chatRoomId,
                  {
                    state: { chatRoom: state.chatRoom },
                  },
                )
              }
            >
              채팅방 입장
            </div>
          </div>
        </div>
      </>
    );
};

export default EnterChatRoomPage;