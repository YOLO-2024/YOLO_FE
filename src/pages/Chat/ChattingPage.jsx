import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import * as StompJs from '@stomp/stompjs';
import '../../styles/pages/Chat/ChattingPage.scss';
import BackIcon from '../../assets/svgs/BackIcon';
import basicProfile from '../../assets/images/basicProfile.jpg';
import '../../styles/component/TextInput.scss';
import Exit from '../../assets/svgs/Exit.svg';
import { NotificationIcon } from '../../assets/svgs/NotificationIcon';
import Modal from '../../components/Modal/Modal';

const ChattingPage = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const socket = import.meta.env.VITE_WEBSOCKET_URL;
  let [client, changeClient] = useState(null);
  const [chatData, setChatData] = useState({});
  const [chat, setChat] = useState('');
  const { state } = useLocation();
  const userProfile = JSON.parse(sessionStorage.getItem('myInfo'));
  const [isValid, setIsValid] = useState(false);
  const [isChatDeclarationActive, setIsChatDeclarationActive] = useState(false);
  const [isChatRoomExit, setIsChatRoomExit] = useState(false);

  const [page, setPage] = useState(0);

  console.log(socket);
  console.log(state.chatRoom.chatRoomInfo.chatRoomId);
  console.log(userProfile);

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    Object.keys(chatData).forEach((date) => {
      console.log(date + ':'); // 날짜 출력
      console.log(chatData[date]);
      chatData[date].forEach((msgObject) => {
        // 해당 날짜의 메시지 목록 순회
        console.log(msgObject.msg); // 각 메시지의 내용 출력
      });
    });
  }, [chat]);

  const getData = () => {
    api
      .get('/api/v1/chat/list/' + state.chatRoom.chatRoomInfo.chatRoomId, {
        params: {
          page: page,
        },
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
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
  };

  useEffect(() => {
    getData();
    connect();
    return () => disConnect();
  }, [page]); // 페이지 변경 시에만 getData 함수 실행

  useEffect(() => {
    let currentDate = getCurrentDate();
    let currentChatData = chatData[currentDate];
    let arrLength;
    if (currentChatData) {
      arrLength = currentChatData.length;
      if (
        currentChatData[arrLength - 1].sender ===
        userProfile.profileInfo.nickname
      ) {
        messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
      }
    }
  }, [chatData]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [chatData]);

  const connect = () => {
    if (client) disConnect();
    // 소켓 연결
    try {
      const clientdata = new StompJs.Client({
        webSocketFactory: () =>
          new WebSocket(import.meta.env.VITE_WEBSOCKET_URL),
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
          import.meta.env.VITE_SUB + state.chatRoom.chatRoomInfo.chatRoomId,
          (message) => {
            if (message.body) {
              let msgObject = JSON.parse(message.body);
              let msg = msgObject.data;
              console.log(msg);
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
      today.setHours(today.getHours()); // 현재 시간에 9시간을 더함
      const newTime = today.toISOString().split('T')[0]; // 결과를 ISO 문자열로 변환

      // 오늘 날짜에 해당하는 메시지 배열이 이미 존재하는지 확인
      if (prevChatData[newTime]) {
        // 존재한다면 새 메시지를 배열에 추가
        return {
          ...prevChatData,
          [newTime]: [...prevChatData[newTime], newMessage],
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
    client.publish({
      destination:
        import.meta.env.VITE_PUB + state.chatRoom.chatRoomInfo.chatRoomId, // 서버의 publish URL
      body: JSON.stringify({
        roomId: state.chatRoom.chatRoomInfo.chatRoomId,
        sender: userProfile.profileInfo.nickname,
        message: chat, // 메시지 내용
        createdAt: new Date().toISOString(),
      }),
    });
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    console.log(chat);
    setChat(''); // 메시지 전송 후 입력 필드 초기화
    console.log('메시지 전송 성공');
    console.log(chatData);
  };

  const formatTime = (time) => {
    const date = new Date(time);

    let hours = date.getHours() + 9;
    const minutes = date.getMinutes().toString().padStart(2, '0'); // 분을 가져와서 두 자리로 만들기

    // 12시간제로 변경하고 AM/PM 설정
    hours = hours % 12 || 12;

    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${amOrPm}`;
  };

  const sortedDates = Object.keys(chatData).sort(
    (a, b) => new Date(a) - new Date(b),
  );

  const sortedChatData = {};
  sortedDates.forEach((date) => {
    sortedChatData[date] = chatData[date].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    );
  });

  const handleChange = (e) => {
    const newComment = e.target.value;
    setChat(newComment);
    console.log(newComment);
    if (newComment.length > 0) setIsValid(true);
    else setIsValid(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const observer = useRef(); // Intersection Observer 객체를 저장할 ref

  useEffect(() => {
    // Intersection Observer 콜백 함수
    const handleIntersection = (entries) => {
      const target = entries[0]; // 감지된 엘리먼트
      if (target.isIntersecting) {
        // 엘리먼트가 화면에 보이면
        console.log('등장');
        console.log(chatData);
        setPage((prevPage) => prevPage + 1); // 페이지 수 증가
      }
    };

    // Intersection Observer 생성
    observer.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // 엘리먼트가 화면에 50% 이상 보이면 감지
    });

    if (messagesEndRef.current) {
      observer.current.observe(messagesEndRef.current); // Intersection Observer에 감지할 요소 등록
    }

    return () => {
      // 컴포넌트가 언마운트되면 Intersection Observer 해제
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [messagesEndRef]);

  return (
    <>
      <div className="ChatPage_Header">
        <div
          className="ChatPage_Header_BackButton"
          onClick={() => navigate(-1)}
        >
          <BackIcon />
        </div>
        <div className="ChatPage_Header_TextBox">
          <div className="ChatPage_Header_TextBox_Title">
            {state.chatRoom.chatRoomInfo.title}
          </div>
          <div className="ChatPage_Header_TextBox_MemberCount">
            {state.chatRoom.chatRoomInfo.memberCount}명
          </div>
        </div>
        <div className="ChatPage_Header_IconBox">
          <div onClick={() => setIsChatRoomExit(true)}>
            <img src={Exit} style={{ width: '30px', height: '30px' }} />
          </div>
          <div onClick={() => setIsChatDeclarationActive(true)}>
            <NotificationIcon />
          </div>
        </div>
      </div>
      {isChatDeclarationActive && (
        <Modal
          actionType="Declaration"
          type="CHAT"
          title="채팅방을 신고 하시겠습니까?"
          body="신고 접수 확인 후, 조치하겠습니다."
          setIsActive={setIsChatDeclarationActive}
          id={state.chatRoom.chatRoomInfo.chatRoomId}
        />
      )}
      {isChatRoomExit && (
        <Modal
          actionType="Delete"
          type="CHATE"
          title="채팅방을 퇴장 하시겠습니까?"
          body={
            <span>
              퇴장하시고 재입장 시,
              <br />
              채팅 기록이 복구되지 않습니다.
            </span>
          }
          setIsActive={setIsChatRoomExit}
          id={state.chatRoom.chatRoomInfo.chatRoomId}
        />
      )}
      <div className="ChatPage_Container">
        <div className="ChatPage_Wrapper">
          {Object.entries(sortedChatData).map(([date, chatData]) => (
            <div key={date}>
              <div className="ChatPage_Date">{date}</div>

              {chatData.map((msgObject, index) =>
                msgObject.messageType === 'ENTER' ? (
                  <div key={index} className="ChatPage_EnterMessage">
                    <div>{msgObject.sender}님이 입장하셨습니다.</div>
                  </div>
                ) : userProfile.profileInfo.nickname === msgObject.sender ? (
                  <div key={index} className="ChatPage_MyContentContainer">
                    <div className="ChatPage_MessageBox_MyNickname">
                      {msgObject.sender}
                      <img
                        src={
                          userProfile.profileImage !== null
                            ? userProfile.profileImage.imageUrl
                            : basicProfile
                        }
                        className="ChatPage_MessageBox_MyProfile"
                      />
                    </div>

                    <div style={{ display: 'flex' }}>
                      <div className="ChatPage_ContentBox_MyTime">
                        {formatTime(msgObject.createdAt)}
                      </div>
                      <div className="ChatPage_ContentBox_MyContent">
                        {msgObject.msg}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={index} className="ChatPage_ContentContainer">
                    <div className="ChatPage_MessageBox_OtherNickname">
                      <img
                        src={
                          msgObject.senderProfile !== null
                            ? msgObject.senderProfile
                            : basicProfile
                        }
                        className="ChatPage_MessageBox_OtherProfile"
                      />
                      {msgObject.sender}
                    </div>

                    <div style={{ display: 'flex' }}>
                      <div className="ChatPage_ContentBox_OtherContent">
                        {msgObject.msg}
                      </div>
                      <div className="ChatPage_ContentBox_OtherTime">
                        {formatTime(msgObject.createdAt)}
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          ))}
        </div>
        <div ref={messagesEndRef}></div>
      </div>
      <form className="textContainer" onSubmit={handleSubmit}>
        <input
          type="text"
          id="msg"
          value={chat}
          className="comment-input"
          onChange={handleChange}
          placeholder="텍스트를 입력해주세요."
        />
        <button
          className="Textcheck"
          onClick={sendChat}
          style={{
            background: isValid ? '#4D8AEB 50%' : '#4D8AEB 99.25%',
            border: 'none',
          }}
        >
          전송
        </button>
      </form>
    </>
  );
};

export default ChattingPage;
