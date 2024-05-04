import '../../styles/chat/EnterChatRoomPage.scss';

const ChatRoomValueBox = ({type, value}) => {
    return (
      <>
        <div className="EnterChatRoomPage_ChatRoom_InfoBox">
          <div className="EnterChatRoomPage_ChatRoom_InfoBox_Text">{type}</div>
          <div className="EnterChatRoomPage_ChatRoom_InfoBox_Info">{
            type === '카테고리' ? value.map((item) => item + ' ') : value
          }</div>
        </div>
      </>
    );
};

export default ChatRoomValueBox;