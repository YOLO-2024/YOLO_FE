import '../../styles/pages/Post/PostList.scss';
import { CommentIcon } from '../../assets/svgs/CommentIcon';
import { LikeIcon } from '../../assets/svgs/LikeIcon';
import { ReviewIcon } from '../../assets/svgs/ReviewIcon';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { api } from '../../utils/customAxios';
import basicProfile from '../../assets/images/basicProfile.jpg';

//포스트 페이지 나열 컴포넌트
export default function PostList() {
  const navigate = useNavigate();
  const user = sessionStorage.getItem('accessToken');
  const [postLists, setPostLists] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const obsRef = useRef(null);
  const [isLastPage, setIsLastPage] = useState(false);

  const onCheck = ({ post }) => {
    api
      .post(
        `/api/v1/post/increase/${post.postInfo.postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => console.log('조회 수 증가', response))
      .catch((error) => console.log(error));
    navigate(`/post-page/check/${post.postInfo.postId}`, { state: post });
  };

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
            setPostLists((prevPosts) => [...prevPosts, ...response.data.data]);
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
      root: null,
      rootMargin: '20px',
      threshold: 0,
    });
    // if (obsRef.current) {
    //   observer.observe(obsRef.current); // loader 엘리먼트 감시 시작
    // }

    // // 컴포넌트 언마운트 시 또는 observer 재설정시 기존 observer 정리
    // return () => observer && observer.disconnect();

    if (postLists.length && obsRef.current) {
      observer.observe(obsRef.current);
    }

    // 관찰 대상인 마지막 요소가 변경될 때마다 observer를 업데이트
    return () => {
      if (obsRef.current) {
        observer.unobserve(obsRef.current);
      }
    };
  }, [postLists]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="PostList">
      {postLists.map((post, index) => (
        <div
          className="postId"
          key={post.postInfo.postId}
          onClick={() => onCheck({ post })}
          ref={index === postLists.length - 1 ? obsRef : null}
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
            <div className="postContents">{post.postInfo.content}</div>
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
    </div>
  );
}
