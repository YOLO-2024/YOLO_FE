import { useEffect } from 'react';
import Apis from '../../apis/axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/main/MainPage.scss';
import { useState } from 'react';

const MainPage = () => {
    const navigate = useNavigate();
    const [chatRoomList, setChatRoomList] = useState([]);
    const [postLikeList, setPostLikeList] = useState([]);
    const [postInterestList, setPostInterestList] = useState([]);

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