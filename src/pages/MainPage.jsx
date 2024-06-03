import '../styles/pages/MainPage.scss';
import api from '../utils/api';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import { lazy, Suspense, useEffect, useState } from 'react';

const RecommendChatting = lazy(
  () => import('../components/Main/RecommendChatting'),
);
const RecommendPost = lazy(() => import('../components/Main/RecommendPost'));
const PopularPostList = lazy(
  () => import('../components/Main/PopularPostList'),
);

export default function MainPage() {
  const [profileData, setProfileData] = useState([]);
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
        vapidKey:
          import.meta.env.VITE_VAPIDKEY,
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
      api.post('/api/v1/notification/login', {
        token: localStorage.getItem('deviceToken'),
      }).then((response) => {
        console.log(response.data);
      });
    }, []);


  useEffect(() => {
    const getProfileData = async () => {
      try {
        const res = await api.get('/api/v1/member/profile');
        setProfileData(res.data.data);
        console.log(profileData);
      } catch (error) {
        console.log(error);
      }
    };
    getProfileData();
  }, []);

  useEffect(() => {
    console.log(profileData);
    sessionStorage.setItem('myInfo', JSON.stringify(profileData));
  }, [profileData]);

  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <div className="main_Container">
          <RecommendChatting />
          <div className="main_Post_Container">
            <div className="main_styledText">인기 있는 게시물</div>
            <PopularPostList />
          </div>
          <div className="main_Post_Container">
            <div className="main_styledText">추천 게시물</div>
            <RecommendPost />
          </div>
        </div>
      </Suspense>
    </>
  );
}
