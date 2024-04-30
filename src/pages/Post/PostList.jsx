import '../../styles/pages/Post/PostList.scss';
import { CommentIcon } from '../../assets/svgs/CommentIcon';
import { LikeIcon } from '../../assets/svgs/LikeIcon';
import { ReviewIcon } from '../../assets/svgs/ReviewIcon';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import basicProfile from '../../assets/images/basicProfile.jpg';

//포스트 페이지 나열 컴포넌트
export default function PostList() {
  const navigate = useNavigate();
  const [postsData, setPostsData] = useState([]);

  const onCheck = ({ post }) => {
    console.log(post.postImage);
    navigate(`/post-page/check/${post.postInfo.postId}`, {
      state: {
        postId: `${post.postInfo.postId}`,
        writerName: `${post.writerInfo.nickname}`,
        title: `${post.postInfo.title}`,
        createdAt: `${post.postInfo.createdAt.split('T')[0]}`,
        category: `${post.postInfo.categories}`,
        content: `${post.postInfo.content}`,
        likeCount: `${post.postInfo.likeCount}`,
        reviewCount: `${post.postInfo.reviewCount}`,
        postImages: post.postImage,
        profileImage: `${post.writerInfo.profileImage?.imageUrl}`,
      },
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get('/api/v1/post/check', {});
        setPostsData(response.data);
        console.log('post 불러오기');
      } catch (error) {
        console.error('api error: ', error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    console.log(postsData);
  }, [postsData]);

  if (!postsData.data || !postsData.data) {
    return <div>데이터를 불러오는 중이거나 데이터가 없습니다.</div>;
  }

  return (
    <div className="PostList">
      {postsData.data.map((post) => (
        <div
          className="postId"
          key={post.postInfo.postId}
          onClick={() => onCheck({ post })}
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
