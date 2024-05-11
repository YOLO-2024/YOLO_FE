import Apis from '../../apis/axios';
import { useState } from 'react';
import { useEffect } from 'react';
import '../../styles/post/PostListPage.scss';
import NoImage from '../../assets/Login/NoImage.webp';
import commentCount from '../../assets/post/commentCount.svg';
import likeCount from '../../assets/post/likeCount.svg';
import reviewCount from '../../assets/post/reviewCount.svg';
import add from '../../assets/post/add.svg';
import { useNavigate } from 'react-router-dom';

const PostListPage = () => {
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(0);

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

  useEffect(() => {
    Apis.get('/api/v1/post/page', {
      params: { page: page },
    })
      .then((response) => {
        const newPosts = response.data.data.map((item) => item);
        setPostList((prevPosts) => [...prevPosts, ...newPosts]);

      })
  }, [page]);

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
  }

  const navigate = useNavigate();

  return (
    <div className="PostList_Container">
      <div className="PostList_Wrapper">
        {postList ? (
          postList.map((post, index) => (
            <div
              key={index}
              className="PostList_Post_Wrapper"
              onClick={() => navigate(`/post/${post.postInfo.postId}`, {
                state: { postInfo: post },
              })}
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
                  <img src={likeCount} className="PostList_Post_Count_Icon" />
                  <div className="PostList_Post_Count_Text">
                    {post.postInfo.likeCount}
                  </div>
                  <img
                    src={commentCount}
                    className="PostList_Post_Count_Icon"
                  />
                  <div className="PostList_Post_Count_Text">
                    {post.postInfo.commentCount}
                  </div>
                  <img src={reviewCount} className="PostList_Post_Count_Icon" />
                  <div className="PostList_Post_Count_Text">
                    {post.postInfo.reviewCount}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>등록된 포스트가 없습니다.</div>
        )}
        <div id="observer" style={{ height: '10px', border: 'none' }}></div>
      </div>
      <div
        className="PostList_CreateButton"
        onClick={() => navigate('/post/create')}
      >
        <img src={add} className="PostList_CreateButton_Icon" />
      </div>
    </div>
  );
};

export default PostListPage;