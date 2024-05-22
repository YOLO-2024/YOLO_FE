import '../../styles/component/main/MainPostList.scss';
import NoImage from '../../assets/images/NoImage.webp';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const RecommendPostItem = ({ title, categories, data }) => {
  const navigate = useNavigate();
  const onClickedRecommendPost = () => {
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
  console.log(data);
  console.log(data.postImage[0]?.imageUrl);
  const imageData = data.postImage[0]?.imageUrl;
  return (
    <div className="mainPostItem_Container" onClick={onClickedRecommendPost}>
      <div className="mainPostImage_Container">
        <img
          src={imageData ? imageData : NoImage}
          style={{
            width: '147px',
            height: '108px',
            borderRadius: '15px',
          }}
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

export default function RecommendPost() {
  const [recommendPostList, setRecommendPostList] = useState([]);

  useEffect(() => {
    const getRecommendedPost = async () => {
      try {
        const recommendedList = await api.get('/api/v1/post/review');
        console.log(recommendedList.data.data);
        setRecommendPostList(recommendedList.data.data);
        console.log(recommendPostList);
      } catch (error) {
        console.log(error);
      }
    };
    getRecommendedPost();
  }, []);

  useEffect(() => {
    console.log(recommendPostList);
  }, [recommendPostList]);
  return (
    <div className="mainPost_Container">
      {recommendPostList.map((recommendPost, index) => (
        <RecommendPostItem
          key={index}
          postId={recommendPost.postInfo.postId}
          title={recommendPost.postInfo.title}
          categories={recommendPost.postInfo.categories}
          data={recommendPost}
        />
      ))}
    </div>
  );
}
