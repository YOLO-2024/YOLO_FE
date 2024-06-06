import '../../styles/pages/Post/PostList.scss';
import { CommentIcon } from '../../assets/svgs/CommentIcon';
import { LikeIcon } from '../../assets/svgs/LikeIcon';
import { ReviewIcon } from '../../assets/svgs/ReviewIcon';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import api from '../../utils/api';
import NoImage from '../../assets/images/NoImage.webp';

//포스트 페이지 나열 컴포넌트
export default function PostList() {
  const navigate = useNavigate();
  const user = sessionStorage.getItem('accessToken');
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const obsRef = useRef(null);
  const [isLastPage, setIsLastPage] = useState(false);

  console.log(postList);
  useEffect(() => {
    if (!isLastPage) {
      setLoading(true);
      const fetchPosts = async () => {
        await api
          .get('/api/v1/post/page', {
            headers: { Authorization: `Bearer ${user}` },
            params: { page: page },
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.data.length === 0) {
              // 데이터 길이가 0이면 마지막 페이지로 간주
              setIsLastPage(true);
            }
            setPostList((prevPosts) => [...prevPosts, ...response.data.data]);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      };
      fetchPosts();
    }
  }, [page, isLastPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });

    if (postList.length && obsRef.current) {
      observer.observe(obsRef.current);
    }
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
    <div className="PostList">
      {postList.length > 0 ? (
        postList.map((post, index) => (
          <div
            className="postId"
            key={post.postInfo.postId}
            onClick={() =>
              navigate(`/post-page/check/${post.postInfo.postId}`, {
                state: post,
              })
            }
            ref={index === postList.length - 1 ? obsRef : null}
          >
            <img
              className="postIcon"
              src={
                post.postImage.length !== 0
                  ? post.postImage[0].imageUrl
                  : NoImage
              }
              alt="게시물 사진"
            />

            <div className="Post-container">
              <div className="Titlecontainer">
                <div className="postTitle">{post.postInfo.title}</div>
                <div className="postCreatedAt">
                  {post.postInfo.createdAt.split('T')[0]}
                </div>
              </div>
              <div className="postContents">{post.postInfo.content}</div>
              <div className="CountContainer">
                <div>
                  <LikeIcon />
                  {post.postInfo.likeCount}
                </div>
                <div>
                  <CommentIcon />
                  {post.postInfo.commentCount}
                </div>
                <div>
                  <ReviewIcon />
                  {post.postInfo.reviewCount}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="searchResult_none">등록된 게시물이 없습니다.</div>
      )}
    </div>
  );
}
