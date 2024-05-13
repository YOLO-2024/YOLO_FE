import { useEffect, useRef, useState } from 'react';
import BottomNavBar from '../../components/Layout/BottomNavBar';
import basicProfile from '../../assets/images/basicProfile.jpg';
import '../../styles/pages/search/SearchPage.scss';
import '../../styles/pages/Post/PostList.scss';
import BackIcon from '../../assets/svgs/BackIcon';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { LikeIcon } from '../../assets/svgs/LikeIcon';
import { CommentIcon } from '../../assets/svgs/CommentIcon';
import { ReviewIcon } from '../../assets/svgs/ReviewIcon';
import person from '../../assets/svgs/chattingPerson.svg';

export default function SearchPage() {
  const [selected, setSelected] = useState('');
  const [keyword, setKeyword] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const obsRef = useRef(null);

  console.log(page);
  const onSerach = () => {
    setIsSearch(true);
    setSelected('게시물');
    api
      .get('/api/v1/search/search-post', {
        params: { page: page, keyword: keyword },
      })
      .then((response) => {
        console.log(response.data.data);
        setPostList(response.data.data);
      })
      .catch((error) => console.log(error));

    api
      .get('/api/v1/search/search-chatroom', {
        params: { page: page, keyword: keyword },
      })
      .then((response) => {
        console.log(response.data.data);
        setChatList(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    });

    if (postList.length && obsRef.current) {
      observer.observe(obsRef.current);
    }

    // 관찰 대상인 마지막 요소가 변경될 때마다 observer를 업데이트
    return () => {
      if (obsRef.current) {
        observer.unobserve(obsRef.current);
      }
    };
  }, [postList]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="searchBar_Wrapper">
        <div className="gobackButton" onClick={() => navigate(-1)}>
          <BackIcon />
        </div>
        <input
          type="text"
          className="searchInput"
          placeholder="제목, 글 내용, 관심사, 거주지"
          onChange={(e) => setKeyword(e.target.value)}
          style={{ fontSize: '15px' }}
        />
        <button
          className="searchBar_Button"
          disabled={keyword === '' ? true : false}
          onClick={onSerach}
        >
          검색
        </button>
      </div>
      <div className="search_Wrapper">
        {isSearch && (
          <div className="searchTarget_Container">
            <div
              className={`searchTarget_Text ${selected === '게시물' ? 'selected' : ''}`}
              onClick={() => setSelected('게시물')}
            >
              게시물
            </div>
            <div
              className={`searchTarget_Text ${selected === '채팅방' ? 'selected' : ''}`}
              onClick={() => setSelected('채팅방')}
            >
              채팅방
            </div>
          </div>
        )}
        <div className="searchResult_Container">
          {selected === '게시물' &&
            (postList.length > 0 ? (
              <>
                {postList.map((post, index) => (
                  <div
                    key={post.postInfo.postId}
                    className="postId"
                    onClick={() => {
                      navigate(`/post-page/check/${post.postInfo.postId}`, {
                        state: post,
                      });
                    }}
                    ref={index === postList.length - 1 ? obsRef : null}
                  >
                    <div className="postIcon">
                      <img
                        className="postIcon"
                        src={
                          post.postImage.length !== 0
                            ? post.postImage[0].imageUrl
                            : basicProfile
                        }
                        alt="게시물 사진"
                      />
                    </div>
                    <div className="Post-container">
                      <div className="Titlecontainer">
                        <div className="postTitle">{post.postInfo.title}</div>
                        <div className="postCreatedAt">
                          {post.postInfo.createdAt.split('T')[0]}
                        </div>
                      </div>
                      <div className="postContents">
                        {post.postInfo.content}
                      </div>
                      <div className="CountContainer">
                        <div>
                          <LikeIcon />
                          {post.postInfo.likeCount}
                        </div>
                        <div>
                          <CommentIcon />
                        </div>
                        <div>
                          <ReviewIcon />
                          {post.postInfo.reviewCount}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="searchResult_none">
                검색 결과가 존재하지 않습니다.
              </div>
            ))}
          {selected === '채팅방' &&
            (chatList.length > 0 ? (
              <>
                {chatList.map((chat, index) => (
                  <div
                    className="chatId"
                    key={chat.chatRoomInfo.chatRoomId}
                    onClick={() => {
                      navigate(
                        `/chat-page/join/${chat.chatRoomInfo.chatRoomId}`,
                        {
                          state: { chat },
                        },
                      );
                    }}
                  >
                    <img
                      className="chatIcon"
                      src={
                        chat.chatRoomInfo.imageUrl
                          ? chat.chatRoomInfo.imageUrl
                          : basicProfile
                      }
                      alt="채팅방 사진"
                    />
                    <div className="chatInfoWrapper">
                      <div className="chatInfoContainer">
                        <div className="chatTitle">
                          {chat.chatRoomInfo.title}
                        </div>
                        <div className="chatContent">
                          {chat.chatRoomInfo.content}
                        </div>
                      </div>
                      <div className="chatMemberCount">
                        <img src={person} />
                        {chat.chatRoomInfo.memberCount}명
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="searchResult_none">
                검색 결과가 존재하지 않습니다.
              </div>
            ))}
        </div>
      </div>
      <BottomNavBar />
    </>
  );
}
