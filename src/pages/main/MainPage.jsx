import { useEffect } from 'react';
import Apis from '../../apis/axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/main/MainPage.scss';
import NoImage from '../../assets/Login/NoImage.webp';
import group from '../../assets/main/group.png';
import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';


const MainPage = () => {
    const navigate = useNavigate();
    const [chatRoomList, setChatRoomList] = useState([]);
    const [postLikeList, setPostLikeList] = useState([]);
    const [postInterestList, setPostInterestList] = useState([]);
    
    useEffect(() => {
      if(!sessionStorage.getItem('accessToken') || !sessionStorage.getItem('refreshToken')) {
        navigate('/login');
      }
    }, [])

    const onMessageFCM = async () => {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;

      const firebaseApp = initializeApp({
        apiKey: process.env.REACT_APP_APIKEY,
        authDomain: process.env.REACT_APP_AUTHDOMAIN,
        projectId: process.env.REACT_APP_PROJECTID,
        storageBucket: process.env.REACT_APP_STORAGEBUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
        appId: process.env.REACT_APP_APPID,
        measurementId: process.env.REACT_APP_MEASUREMENTID,
      });

      const messaging = getMessaging(firebaseApp);

      try {
        const currentToken = await getToken(messaging, {
          vapidKey: process.env.REACT_APP_VAPIDKEY,
          serviceWorkerRegistration: await navigator.serviceWorker.register(
            "/firebase-messaging-sw.js"
          ),
        });

        if (currentToken) {
          console.log(currentToken);
          localStorage.setItem("deviceToken", currentToken);
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      } catch (err) {
        console.log("An error occurred while retrieving token. ", err);
      }

      onMessage(messaging, (payload) => {
        console.log("Message received. ", payload);
      });
    };

    useEffect(() => {
      onMessageFCM();
      if (localStorage.getItem("deviceToken")) {
        Apis.post("/api/v1/notification/login", {
          token: localStorage.getItem("deviceToken"),
        }).then((response) => {
          console.log(response.data);
        });
      }
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
    
    return (
      <>
        <div className="MainPage_Container">
          <div className="MainPage_Wrapper">
            {/* 추천 단체 채팅 */}
            <div className="MainPage_ChatRoom_List">
              {chatRoomList.length > 0 ? (
                chatRoomList.map((chatRoom, index) => (
                  <div
                    className="MainPage_ChatRoom_List_Box"
                    key={index}
                    onClick={() =>
                      navigate(
                        '/chatroom/enter' + chatRoom.chatRoomInfo.chatRoomId,
                      )
                    }
                  >
                    <img
                      src={group}
                      alt="group"
                      className="MainPage_ChatRoom_List_Box_image"
                    />
                    <div className="MainPage_ChatRoom_List_Box_title">
                      {chatRoom.chatRoomInfo.title}
                    </div>
                    <div className="MainPage_ChatRoom_List_Box_content">
                      {chatRoom.chatRoomInfo.content}
                    </div>
                  </div>
                ))
              ) : (
                <div
                  className="MainPage_ChatRoom_List_Box MainPage_ChatRoom_List_Box_content"
                  style={{ alignItems: 'center', justifyContent: 'center' }}
                >
                  추천 채팅방이 없습니다.
                </div>
              )}
            </div>
            <div className="MainPage_Post_Text">인기 있는 게시물</div>
            <div
              className="MainPage_Post_List"
              style={{ marginBottom: 'auto' }}
            >
              {postLikeList.length > 0 ? (
                postLikeList.map((postList, index) => (
                  <div
                    className="MainPage_Post_List_Box"
                    key={index}
                    onClick={() =>
                      navigate('/post/' + postList.postInfo.postId)
                    }
                  >
                    <img
                      src={
                        postList.postImage.length > 0
                          ? postList.postImage[0].imageUrl
                          : NoImage
                      }
                      className="MainPage_Post_List_Box_Image"
                    />
                    <div className="MainPage_Post_List_Box_Text">
                      {postList.postInfo.title}
                    </div>
                    <div className="MainPage_Post_List_Box_Category_List">
                      {postList.postInfo.categories.map((category, index) => (
                        <div
                          key={index}
                          className="MainPage_Post_List_Box_Category_List_Item"
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="MainPage_Post_List">
                  <div>게시물이 없습니다.</div>
                </div>
              )}
            </div>
            {/* 사용자 관심사 기반 게시물 */}
            <div className="MainPage_Post_Text" style={{ marginTop: 'auto' }}>
              관심 있는 게시물
            </div>
            <div
              className="MainPage_Post_List"
              style={{ marginBottom: 'auto' }}
            >
              {postInterestList.length > 0 ? (
                postInterestList.map((postList, index) => (
                  <div
                    className="MainPage_Post_List_Box"
                    key={index}
                    onClick={() =>
                      navigate('/post/' + postList.postInfo.postId)
                    }
                  >
                    <img
                      src={
                        postList.postImage.length > 0
                          ? postList.postImage[0].imageUrl
                          : NoImage
                      }
                      className="MainPage_Post_List_Box_Image"
                    />
                    <div className="MainPage_Post_List_Box_Text">
                      {postList.postInfo.title}
                    </div>
                    <div className="MainPage_Post_List_Box_Category_List">
                      {postList.postInfo.categories.map((category, index) => (
                        <div
                          key={index}
                          className="MainPage_Post_List_Box_Category_List_Item"
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="MainPage_Post_List">
                  <div>게시물이 없습니다.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
};

export default MainPage;