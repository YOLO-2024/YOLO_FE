import { useEffect } from 'react';
import Apis from '../../apis/axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/main/MainPage.scss';
import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';


const MainPage = () => {
    const navigate = useNavigate();
    const [chatRoomList, setChatRoomList] = useState([]);
    const [postLikeList, setPostLikeList] = useState([]);
    const [postInterestList, setPostInterestList] = useState([]);
    const onMessageFCM = async () => {
      // 브라우저에 알림 권한 요청
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;

      const firebaseApp = initializeApp({
        authDomain: import.meta.env.VITE_AUTHDOMAIN,
        projectId: import.meta.env.VITE_PROJECTID,
        storageBucket: import.meta.env.VITE_STORAGEBUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
        appId: import.meta.env.VITE_APPID,
        measurementId: import.meta.env.VITE_MEASUREMENTID,
      });

      const messaging = getMessaging(firebaseApp);

      // 인증서 키 값
      getToken(messaging, {
        vapidKey: import.meta.env.VITE_VAPIDKEY,
      })
        .then((currentToken) => {
          if (currentToken) {
            localStorage.setItem('deviceToken', currentToken);
            // 정상적으로 토큰 발급 시 콘솔 출력
            console.log(currentToken);
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });

      // 브라우저를 보고 있을 때에는 콘솔로 출력
      onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
      });
    };

    useEffect(() => {
      onMessageFCM();
      Apis.post('/api/v1/notification/login', {
        token : localStorage.getItem("deviceToken")
      }).then((response) => {
        console.log(response.data)
      })
    }, []);

    useEffect(() => {
        Apis.get('/api/v1/member/profile')
        .then((response) => {
            sessionStorage.setItem(
              'memberState',
              JSON.stringify(response.data.data)
            );
        })

        Apis.get('/api/v1/chat/location-chat', {
            params : {
                page : 0
            }
        })
        .then((response) => {
            setChatRoomList(response.data.data)
        });

        Apis.get('/api/v1/post/popular', {
          params: {
            page: 0,
          },
        }).then((response) => {
          setPostLikeList(response.data.data);
        });

        Apis.get('/api/v1/post/review', {
          params: {
            page: 0,
          },
        }).then((response) => {
          setPostInterestList(response.data.data);
        });
    }, [])

    console.log(chatRoomList);
    console.log(postLikeList);
    console.log(postInterestList);



    const memberState = JSON.parse(sessionStorage.getItem('memberState'));
    
    return (
      <>
        <div className="MainPage_Container">
          <div className="MainPage_Wrapper">
            {/* 추천 단체 채팅 */}
            <div className="MainPage_ChatRoom_List">
              <div className="MainPage_ChatRoom_List_Box"></div>
            </div>
            {/* 인기 게시물 (좋아요 기반) */}
            <div className="MainPage_PostLike_List">
              <div>인기 있는 게시물</div>
              <div></div>
            </div>
            {/* 사용자 관심사 기반 게시물 */}
          </div>
        </div>
      </>
    );
};

export default MainPage;