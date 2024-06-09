import '../../styles/pages/Chat/JoinChatPage.scss';
import '../../styles/pages/login/AddInfoPage.scss';
import { PreviousIcon } from '../../assets/svgs/PreviousIcon';
import { useNavigate, useLocation } from 'react-router-dom';
import NoImage from '../../assets/images/NoImage.jpg';
import chattingPerson from '../../assets/svgs/chattingPerson.svg';
import { ModeEditIcon } from '../../assets/svgs/ModeEditIcon';
import { DeleteIcon } from '../../assets/svgs/DeleteIcon';
import { useEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal';

export default function JoinChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { chatRoomData } = location.state || {};
  const [isChatDeleteActive, setIsChatDeleteActive] = useState(false);
  const [isAble, setIsAble] = useState(false);
  const myname = JSON.parse(sessionStorage.getItem('myInfo'));

  useEffect(() => {
    if (myname.profileInfo.nickname === chatRoomData.creatorInfo.nickname) {
      setIsAble(true);
    }
  }, []);

  console.log(myname);
  console.log(myname.profileInfo.nickname);
  console.log(chatRoomData.creatorInfo?.nickname);
  const onClickGoBack = () => {
    navigate(-1);
  };

  // const onClickDelete = () => {
  //   setIsChatDeleteActive(!isChatDeleteActive);
  // };

  const onClickedEdit = () => {
    console.log(chatRoomData);

    navigate(`/chat-page/edit/${chatRoomData.chatRoomInfo.chatRoomId}`, {
      state: chatRoomData,
    });
  };

  const onErrorImg = (e) => {
    e.target.src = NoImage;
  };

  console.log(chatRoomData);
  return (
    <>
      <div className="joinchat_Wrapper">
        <div className="joinchat_Header">
          <div className="previousIcon" onClick={onClickGoBack}>
            <PreviousIcon />
          </div>
          {isAble ? (
            <div className="headerIcons_container">
              <div onClick={() => onClickedEdit()}>
                <ModeEditIcon />
              </div>
              <div
                onClick={() => {
                  setIsChatDeleteActive(true);
                }}
              >
                <DeleteIcon />
              </div>
              {isChatDeleteActive && (
                <Modal
                  actionType="Delete"
                  type="CHATD"
                  title="채팅방을 삭제하시겠습니까?"
                  body="채팅방이 삭제되면, 복구되지 않습니다."
                  setIsActive={setIsChatDeleteActive}
                  id={chatRoomData.chatRoomInfo.chatRoomId}
                />
              )}
            </div>
          ) : null}
        </div>

        <div className="joinchat_contentContainer">
          <div className="joinchat_profileWrapper">
            <div className="joinchat_profileImg">
              <img
                onError={onErrorImg}
                src={
                  chatRoomData.chatRoomImage?.imageUrl
                    ? chatRoomData.chatRoomImage?.imageUrl
                    : NoImage
                }
                style={{
                  borderRadius: '15%',
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
              {chatRoomData.chatRoomInfo.interests + ' '}
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
            onClick={() =>
              navigate('/chat-page/' + chatRoomData.chatRoomInfo.chatRoomId, {
                state: {
                  chatRoom: chatRoomData,
                },
              })
            }
          >
            채팅방 입장하기
          </div>
        </div>
      </div>
    </>
  );
}
