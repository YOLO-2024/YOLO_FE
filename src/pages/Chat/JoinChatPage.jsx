import '../../styles/pages/Chat/JoinChatPage.scss';
import '../../styles/pages/login/AddInfoPage.scss';
import { PreviousIcon } from '../../assets/svgs/PreviousIcon';
import { useNavigate } from 'react-router-dom';
import basicProfile from '../../assets/images/basicProfile.jpg';
import chattingPerson from '../../assets/svgs/chattingPerson.svg';
import BottomNavBar from '../../components/Layout/BottomNavBar';

export default function JoinChatPage() {
  const navigate = useNavigate();

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
                src={basicProfile}
                style={{
                  borderRadius: '30%',
                  width: 'calc(var(--vh, 1vh) * 15)',
                  height: 'calc(var(--vh, 1vh) * 15)',
                }}
              />
            </div>
            <div className="chatStats_Container">
              <img src={chattingPerson} />
              10 명
            </div>
          </div>
          <div className="joinchat_infoContainer">
            <div className="text">채팅방 제목</div>
            <div className="joinchat_inputContainer">가가가</div>
          </div>
          <div className="joinchat_infoContainer">
            <div className="text">채팅방 한줄소개</div>
            <div className="joinchat_inputContainer">가가가</div>
          </div>
          <div className="joinchat_infoContainer">
            <div className="text">카테고리</div>
            <div className="joinchat_inputContainer">운동</div>
          </div>
          <div className="joinchat_infoContainer">
            <div className="text">지역</div>
            <div className="joinchat_inputContainer">서울 강남</div>
          </div>
          <div
            className="submitButton"
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
