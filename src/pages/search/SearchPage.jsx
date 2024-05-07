import React from 'react';
import '../../styles/serach/SearchPage.scss';
import '../../styles/post/PostListPage.scss';
import '../../styles/chat/ChatRoomListPage.scss';
import BackButton from '../../assets/Login/interest/backButton.svg'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Apis from '../../apis/axios';
import Footer from '../../component/common/Footer';
import { useEffect } from 'react';
import NoImage from '../../assets/Login/NoImage.webp';
import commentCount from '../../assets/post/commentCount.svg';
import likeCount from '../../assets/post/likeCount.svg';
import reviewCount from '../../assets/post/reviewCount.svg';
import personCount from '../../assets/Chat/personCount.svg';

const SearchPage = () => {
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchType, setSearchType] = useState('post');
    const [isSearch, setIsSearch] = useState(false)
    const [page, setPage] = useState(0);
    const [postList, setPostList] = useState([]);
    const [chatRoomList, setChatRoomList] = useState([]);

    const onClickButton = () => {
        setIsSearch(true);
        Apis.get('/api/v1/search/search-post', {
            params: {
                page: page,
                keyword :searchKeyword,
            }
        }).then((response) => {
            setPostList(response.data.data);
        })
        Apis.get('/api/v1/search/search-chatroom', {
          params: {
            page: page,
            keyword: searchKeyword,
          },
        }).then((response) => {
          setChatRoomList(response.data.data);
        });
        setSearchKeyword('')
    }

    console.log(postList);
    console.log(chatRoomList);

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

    const handleObserver = (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
        setPage((prevPage) => prevPage + 1);
        }
    };

    const dateFormatter = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
        return formattedDate;
    };
    
    return (
      <>
        <div className="SearchPage_Header">
          <img
            src={BackButton}
            className="SearchPage_Header_BackButton"
            onClick={() => navigate(-1)}
          />
          <input
            type="text"
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="SearchPage_Header_Input"
            placeholder="제목, 글 내용, 관심사, 거주지"
          />
          <button className="SearchPage_Header_Button" onClick={onClickButton}>
            검색
          </button>
        </div>
        {isSearch && (
          <div className="SearchPage_Container">
            <div className="SearchPage_Wrapper">
              <div className="SearchPage_SearchType">
                <div
                  className="SearchPage_SearchType_Text"
                  style={{
                    color: searchType === 'post' ? '#266ED7' : '#303030',
                  }}
                  onClick={() => setSearchType('post')}
                >
                  게시물
                </div>
                <div
                  className="SearchPage_SearchType_Text"
                  style={{
                    color: searchType === 'chatroom' ? '#266ED7' : '#303030',
                  }}
                  onClick={() => setSearchType('chatroom')}
                >
                  채팅방
                </div>
              </div>
              {searchType === 'post' ? (
                postList.length > 0 ? (
                  postList.map((post, index) => (
                    <div
                      key={index}
                      className="PostList_Post_Wrapper"
                      onClick={() =>
                        navigate(`/post/${post.postInfo.postId}`, {
                          state: { postInfo: post },
                        })
                      }
                    >
                      {/* 이미지 */}
                      <div className="PostList_Post_Image_Box">
                        <img
                          src={
                            post.postImage.length !== 0
                              ? post.postImage[0].imageUrl
                              : NoImage
                          }
                          className="PostList_Post_Image"
                        />
                      </div>
                      {/* 제목 + 본문 + 날짜 / 좋아요 댓글 조회수 */}
                      <div className="PostList_Post_Content_Box">
                        <div className="PostList_Post_Content_First">
                          <div className="PostList_Post_Content_Title">
                            {post.postInfo.title}
                          </div>
                          <div className="PostList_Post_Content_CreatedAt">
                            {dateFormatter(post.postInfo.createdAt)}
                          </div>
                        </div>
                        <div className="PostList_Post_Content_Second">
                          {post.postInfo.content}
                        </div>
                        <div className="PostList_Post_Count">
                          <img
                            src={likeCount}
                            className="PostList_Post_Count_Icon"
                          />
                          <div className="PostList_Post_Count_Text">
                            {post.postInfo.likeCount}
                          </div>
                          <img
                            src={commentCount}
                            className="PostList_Post_Count_Icon"
                          />
                          <div className="PostList_Post_Count_Text">
                            {post.postInfo.likeCount}
                          </div>
                          <img
                            src={reviewCount}
                            className="PostList_Post_Count_Icon"
                          />
                          <div className="PostList_Post_Count_Text">
                            {post.postInfo.reviewCount}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>검색하신 포스트가 없습니다.</div>
                )
              ) : chatRoomList.length > 0 ? (
                chatRoomList.map((chatRoom, index) => (
                  <div
                    key={index}
                    className="ChatRoomPage_ChatRoom_Wrapper"
                    style={{
                      marginTop: '6px',
                      marginBottom: '6px',
                    }}
                    onClick={() =>
                      navigate(
                        '/chatroom/enter/' + chatRoom.chatRoomInfo.chatRoomId,
                        {
                          state: { chatRoom: chatRoom },
                        },
                      )
                    }
                  >
                    {/* 이미지 */}
                    <div className="ChatRoomListPage_ChatRoom_Image_Box">
                      <img
                        src={
                          chatRoom.chatRoomImage !== null
                            ? chatRoom.chatRoomImage.imageUrl
                            : NoImage
                        }
                        className="ChatRoomListPage_ChatRoom_Image"
                      />
                    </div>
                    <div className="ChatRoomPage_ChatRoom_Content_Box">
                      <div className="ChatRoomPage_ChatRoom_Content_First">
                        <div className="ChatRoomPage_ChatRoom_Content_Title">
                          {chatRoom.chatRoomInfo.title}
                        </div>
                      </div>
                      <div className="ChatRoomPage_ChatRoom_Content_Second">
                        {chatRoom.chatRoomInfo.content}
                      </div>
                      <div className="ChatRoomPage_ChatRoom_Count">
                        <img
                          src={personCount}
                          className="ChatRoomPage_ChatRoom_Count_Icon"
                        />
                        <div className="ChatRoomPage_ChatRoom_Count_Text">
                          {chatRoom.chatRoomInfo.memberCount}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>검색하신 채팅방이 없습니다.</div>
              )}
            </div>
            <div id="observer" style={{ height: '10px', border: 'none' }}></div>
          </div>
        )}
        <Footer />
      </>
    );
};

export default SearchPage;