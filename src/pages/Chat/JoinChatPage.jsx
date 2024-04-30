import '../../styles/pages/Chat/JoinChatPage.scss';
import '../../styles/pages/login/AddInfoPage.scss';
import { PreviousIcon } from '../../assets/svgs/PreviousIcon';
import { useNavigate, useLocation } from 'react-router-dom';
import basicProfile from '../../assets/images/basicProfile.jpg';
import chattingPerson from '../../assets/svgs/chattingPerson.svg';
import BottomNavBar from '../../components/Layout/BottomNavBar';

export default function JoinChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { chatRoomData } = location.state || {};

  const onClickGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="joinchat_Wrapper">
        <div className="joinchat_Header">
          <div className="previousIcon" onClick={onClickGoBack}>
            <PreviousIcon />
          </div>
        </div>
        <div className="joinchat_contentContainer">
          <div className="joinchat_profileWrapper">
            <div className="joinchat_profileImg">
              <img
                src={chatRoomData.chatRoomImage?.imageUrl || basicProfile}
                style={{
                  borderRadius: '30%',
                  width: 'calc(var(--vh, 1vh) * 15)',
                  height: 'calc(var(--vh, 1vh) * 15)',
                }}
              />
            </div>
            <div className="chatStats_Container">
              <img src={chattingPerson} />
              {chatRoomData.chatRoomInfo.memberCount} 명
            </div>
          </div>
          <div className="joinchat_infoContainer">
            <div className="text">채팅방 제목</div>
            <div className="joinchat_inputContainer">
              {chatRoomData.chatRoomInfo.title}
            </div>
          </div>
          <div className="joinchat_infoContainer">
            <div className="text">채팅방 한줄소개</div>
            <div className="joinchat_inputContainer">
              {chatRoomData.chatRoomInfo.content}
            </div>
          </div>
          <div className="joinchat_infoContainer">
            <div className="text">카테고리</div>
            <div className="joinchat_inputContainer">
              {chatRoomData.chatRoomInfo.interests}
            </div>
          </div>
          <div className="joinchat_infoContainer">
            <div className="text">지역</div>
            <div className="joinchat_inputContainer">
              {chatRoomData.chatRoomInfo.location}
            </div>
          </div>
          <div
            className="joinchat_joinButton"
            style={{ background: '#2176FF', color: '#FFFFFF' }}
          >
            채팅방 입장하기
          </div>
        </div>
      </div>
      <BottomNavBar />
    </>
  );
}

/*
import { useLocation } from 'react-router-dom';

const ChatRoomJoinPage = () => {
  const location = useLocation();
  const { chatRoomData } = location.state || {};  // 넘겨받은 state가 없는 경우에 대비하여 기본값 설정

  return (
    <div>
      
    </div>
  );
};
*/
