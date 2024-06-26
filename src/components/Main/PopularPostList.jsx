import '../../styles/component/main/MainPostList.scss';
// import DummyPostImage from '../../assets/images/DummyPostImage.jpg';
import api from '../../utils/api';
import NoImage from '../../assets/images/NoImage.jpg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PopularPostItem = ({ image, title, categories, data }) => {
  const navigate = useNavigate();

  const onClickedPost = () => {
    console.log(image);

    console.log(data);
    console.log(data.postImage);
    navigate(`/post-page/check/${data.postInfo.postId}`, {
      state: {
        postData: data,
        postInfo: data.postInfo,
        postImage: data.postImage,
        writerInfo: data.writerInfo,
      },
    });
  };
  const imageData = data.postImage[0]?.imageUrl;
  return (
    <div className="mainPostItem_Container" onClick={onClickedPost}>
      <div className="mainPostImage_Container">
        <img
          src={imageData ? imageData : NoImage}
          style={{ width: '147px', height: '108px', borderRadius: '15px' }}
        />
      </div>
      <div className="mainPostTitle_Container">{title}</div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: '2px',
          flexWrap: 'wrap',
          maxWidth: '150px',
        }}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className="mainPostTag"
            style={{ width: categories.length === 1 ? '60px' : '' }}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function PopularPostList() {
  const [popularPostList, setPopularPostList] = useState([]);

  useEffect(() => {
    const getPopularPost = async () => {
      try {
        const popularList = await api.get('/api/v1/post/popular');
        console.log(popularList.data.data);
        setPopularPostList(popularList.data.data);
        console.log(popularPostList);
      } catch (error) {
        console.log(error);
      }
    };
    getPopularPost();
  }, []);

  useEffect(() => {
    console.log(popularPostList);
  }, [popularPostList]);

  return (
    <div className="mainPost_Container">
      {popularPostList.length === 0 ? (
        <div className="mainPost_none">게시물이 존재하지 않습니다.</div>
      ) : (
        popularPostList.map((post, index) => (
          <PopularPostItem
            key={index}
            postId={post.postInfo.postId}
            title={post.postInfo.title}
            categories={post.postInfo.categories}
            image={post.postImage}
            data={post}
          />
        ))
      )}
    </div>
  );
}
