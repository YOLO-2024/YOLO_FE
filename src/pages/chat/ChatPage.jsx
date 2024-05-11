import { useState } from 'react';
import '../../styles/chat/ChatPage.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Apis from '../../apis/axios';
import * as StompJs from '@stomp/stompjs';
import BackButton from '../../assets/Login/interest/backButton.svg'
import NoProfile from '../../assets/Login/NoProfile.png';
import Exit from '../../assets/Chat/exit.svg';
import Notification from '../../assets/post/Notification.svg';
import { useRef } from 'react';
import Modal from '../../component/Modal';
import { useLayoutEffect } from 'react';

const ChatPage = () => {
  const param = useParams(); // 채널을 구분하는 식별자
  const navigate = useNavigate();
  const chatroomId = param.roomId;
  const messageEndRef = useRef(null);

  let [client, changeClient] = useState(null);
  const [chat, setChat] = useState(''); // 입력된 chat을 받을 변수
  const [chatData, setChatData] = useState({});
  const [isChatDeclarationActive, setIsChatDeclarationActive] = useState(false);
  const [page, setPage] = useState(0);
  const { state } = useLocation();
  const userProfile = JSON.parse(sessionStorage.getItem('memberState'));

  console.log(chatData);

  useEffect(() => {
    connect();
    return () => disConnect();
  }, []);

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

  useLayoutEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    Apis.get('/api/v1/chat/list/' + chatroomId, {
      params: {
        page: page,
      },
    }).then((response) => {
      const newData = response.data.data;

      setChatData((prevChatData) => {
        const mergedData = { ...prevChatData };
        Object.keys(newData).forEach((date) => {
          if (mergedData[date]) {
            mergedData[date] = [...newData[date], ...mergedData[date]];
          } else {
            mergedData[date] = newData[date];
          }
        });
        return mergedData;
      });
    });
  }, [page]);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const connect = () => {
    if (client) disConnect();
    // 소켓 연결
    try {
      const clientdata = new StompJs.Client({
        brokerURL: import.meta.env.VITE_WEBSOCKET_URL,
        connectHeaders: {
          Authorization: `Bearer ` + sessionStorage.getItem('accessToken'),
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000, // 자동 재연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      // 구독
      clientdata.onConnect = function () {
        clientdata.subscribe(
          import.meta.env.VITE_SUB + chatroomId,
          (message) => {
            if (message.body) {
              let msgObject = JSON.parse(message.body);
              let msg = msgObject.data;
              addNewMessage(msg);
            }
          },
        );
      };
      clientdata.activate(); // 클라이언트 활성화
      changeClient(clientdata); // 클라이언트 갱신
    } catch (err) {
      console.error(err);
    }
  };

  const addNewMessage = (newMessage) => {
    setChatData((prevChatData) => {
      // 오늘 날짜를 'YYYY-MM-DD' 형식으로 얻기
      const today = new Date(); // 현재 날짜와 시간을 생성
      today.setHours(today.getHours() + 9); // 현재 시간에 9시간을 더함
      const newTime = today.toISOString().split('T')[0]; // 결과를 ISO 문자열로 변환

      // 오늘 날짜에 해당하는 메시지 배열이 이미 존재하는지 확인
      if (prevChatData[newTime]) {
        // 존재한다면 새 메시지를 배열에 추가
        return {
          ...prevChatData,
          [newTime]: [newMessage, ...prevChatData[newTime]],
        };
      } else {
        // 존재하지 않는다면 새로운 키-값 쌍 추가
        return {
          ...prevChatData,
          [newTime]: [newMessage],
        };
      }
    });
  };

  const disConnect = () => {
    // 연결 끊기
    if (client === null) {
      return;
    }
    client.deactivate();
  };

  const sendChat = () => {
    if (chat === '') {
      return;
    }

    client.publish({
      destination: import.meta.env.VITE_PUB + chatroomId,
      body: JSON.stringify({
        roomId: chatroomId,
        sender: userProfile.profileInfo.nickname,
        message: chat,
      }),
    });
    setChat('');
  };

  const onChangeChat = (e) => {
    setChat(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  // 1. 받은 채팅 데이터를 정렬합니다.
  const sortedDates = Object.keys(chatData).sort(
    (a, b) => new Date(a) - new Date(b),
  );

  // 정렬된 날짜를 기준으로 새로운 객체 생성
  const sortedChatData = {};
  sortedDates.forEach((date) => {
    sortedChatData[date] = chatData[date].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    );
  });

  const convertTime = (time) => {
    const date = new Date(time);

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // 분을 가져와서 두 자리로 만들기

    // 오전 또는 오후 설정
    const amOrPm = hours >= 12 ? 'PM' : 'AM';

    // 12시간제로 변경
    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${amOrPm}`; // HH:MM AM 또는 PM 형식으로 조합
  };

  return (
    <>
      {/* 포스트 삭제 */}
      {isChatDeclarationActive && (
        <Modal
          actionType="Declaration"
          type="CHAT"
          title="채팅방을 신고하시겠습니까?"
          body="신고 접수 확인 후, 조치하겠습니다."
          setIsActive={setIsChatDeclarationActive}
          id={state.chatRoom.chatRoomInfo.chatRoomId}
        />
      )}
      <div className="ChatPage_Header">
        <img
          src={BackButton}
          className="ChatPage_Header_BackButton"
          onClick={() => navigate('/chatroom')}
        />
        <div className="ChatPage_Header_TextBox">
          <div className="ChatPage_Header_TextBox_Title">
            {state.chatRoom.chatRoomInfo.title}
          </div>
          <div className="ChatPage_Header_TextBox_MemberCount">
            {state.chatRoom.chatRoomInfo.memberCount}명
          </div>
        </div>
        <div className="ChatPage_Header_IconBox">
          <img
            src={Notification}
            onClick={() => setIsChatDeclarationActive(true)}
          />
          <img src={Exit} />
        </div>
      </div>
      <div className="ChatPage_Container">
        <div className="ChatPage_Wrapper">
          <div id="observer" style={{ height: '10px', border: 'none' }}></div>
          {Object.entries(sortedChatData).map(([date, messages]) => (
            <div key={date}>
              <div className="ChatPage_Date">{date}</div>
              {messages.map((message, index) =>
                message.messageType === 'ENTER' ? (
                  <div key={index} className="ChatPage_EnterMessage">
                    <div>{message.sender}님이 입장하셨습니다.</div>
                  </div>
                ) : userProfile.profileInfo.nickname === message.sender ? (
                  <div key={index} className="ChatPage_MessageBox">
                    <div className="ChatPage_MessageBox_Top">
                      <div className="ChatPage_MessageBox_MyNickname">
                        {message.sender}
                      </div>
                      <img
                        src={
                          userProfile.profileImage !== null
                            ? userProfile.profileImage.imageUrl
                            : NoProfile
                        }
                        className="ChatPage_MessageBox_MyProfile"
                      />
                    </div>
                    <div className="ChatPage_ContentBox">
                      <div className="ChatPage_ContentBox_MyTime">
                        {convertTime(message.createdAt)}
                      </div>
                      <div className="ChatPage_ContentBox_MyContent">
                        {message.msg}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={index} className="ChatPage_MessageBox">
                    <div className="ChatPage_MessageBox_Top">
                      <img
                        src={
                          message.senderProfile !== null
                            ? message.senderProfile
                            : NoProfile
                        }
                        className="ChatPage_MessageBox_OtherProfile"
                      />
                      <div className="ChatPage_MessageBox_OtherNickname">
                        {message.sender}
                      </div>
                    </div>
                    <div className="ChatPage_ContentBox">
                      <div className="ChatPage_ContentBox_OtherContent">
                        {message.msg}
                      </div>
                      <div className="ChatPage_ContentBox_OtherTime">
                        {convertTime(message.createdAt)}
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          ))}
        </div>
        <div ref={messageEndRef}></div>
      </div>
      <form onSubmit={handleSubmit} className="ChatPage_InputBox">
        <input
          type="text"
          id="msg"
          value={chat}
          placeholder="메시지 보내기"
          onChange={onChangeChat}
          className="ChatPage_InputBox_Input"
          onKeyDown={(ev) => {
            if (ev.keyCode === 13) {
              sendChat();
            }
          }}
        />
        <button onClick={sendChat} className="ChatPage_InputBox_Button">
          전송
        </button>
      </form>
    </>
  );
};

export default ChatPage;