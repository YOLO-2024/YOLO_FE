/*
import { useEffect, useState, useRef } from 'react';
import api from '../../utils/api';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import basicProfile from '../../assets/images/basicProfile.jpg';
import BackIcon from '../../assets/svgs/BackIcon';
import { NotificationIcon } from '../../assets/svgs/NotificationIcon';
import ExitModal from '../../components/Modal/ExitModal';
import NotificationModal from '../../components/Modal/NotificationModal';
import Exit from '../../assets/svgs/Exit.svg';
import '../../styles/pages/Chat/ChattingPage.scss';

const ChattingPage = () => {
  const param = useParams(); // 채널을 구분하는 식별자
  const navigate = useNavigate();
  const chatroomId = param.roomId;
  const messageEndRef = useRef(null);

  let [client, changeClient] = useState(null);
  const [chat, setChat] = useState(''); // 입력된 chat을 받을 변수
  const [chatData, setChatData] = useState({});
  const [isChatDeclarationActive, setIsChatDeclarationActive] = useState(false);
  const { state } = useLocation();
  const userProfile = JSON.parse(sessionStorage.getItem('myInfo'));

    console.log(userProfile);
    
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    api.get('/api/v1/chat/list/' + chatroomId).then((response) => {
      setChatData(response.data.data);
      messageEndRef.current.scrollIntoView({ behavior: 'auto' });
    });
    connect();
    return () => disConnect();
  }, []);

    
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
        messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [chatData]);

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

  console.log(chatData);
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

  const sortedDates = Object.keys(chatData).sort(
    (a, b) => new Date(a) - new Date(b),
  );

  // 정렬된 날짜를 기준으로 새로운 객체 생성
  const sortedChatData = {};
  sortedDates.forEach((date) => {
    sortedChatData[date] = chatData[date];
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
      
      {isChatDeclarationActive && (
        <NotificationModal
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
          src={BackIcon}
          className="ChatPage_Header_BackButton"
          onClick={() => navigate(-1)}
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
            src={NotificationIcon}
            onClick={() => setIsChatDeclarationActive(true)}
          />
          <img src={Exit} />
        </div>
      </div>
      <div className="ChatPage_Container">
        <div className="ChatPage_Wrapper">
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
                            : basicProfile
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
                            : basicProfile
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

export default ChattingPage;
*/
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
      .get('/api/v1/chat/list/' + state.chatRoom.chatRoomInfo.chatRoomId)
      .then((response) => {
        setChatData(response.data.data);
        console.log(chatData);
      });
  };

  useEffect(() => {
    getData();
    connect();
    return () => disConnect();
  }, []);

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
      today.setHours(today.getHours() + 9); // 현재 시간에 9시간을 더함
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
    getData();
    setChat(''); // 메시지 전송 후 입력 필드 초기화
    console.log('메시지 전송 성공');
    console.log(chatData);
  };

  function formatTime(createdAt) {
    const createdAtDate = new Date(createdAt);
    let hours = createdAtDate.getHours() + 9;
    const minutes = createdAtDate.getMinutes().toString().padStart(2, '0');
    const isAm = hours < 12;
    const ampm = isAm ? 'AM' : 'PM';

    // 24시간제를 12시간제로 변환
    hours = hours % 12;
    hours = hours ? hours : 12; // 0시는 12시로 표시

    // 시간을 2자리 숫자로 표시
    const formattedHours = hours.toString().padStart(2, '0');

    return `${formattedHours}:${minutes} ${ampm}`;
  }

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
          <img src={Exit} style={{ width: '30px', height: '30px' }} />
          <NotificationIcon />
        </div>
      </div>
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
