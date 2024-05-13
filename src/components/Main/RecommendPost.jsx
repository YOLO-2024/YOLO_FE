import '../../styles/component/main/MainPostList.scss';
import NoImage from '../../assets/images/NoImage.webp';
import { useEffect, useState } from 'react';
import api from '../../utils/api';

const RecommendPostItem = ({ title, categories, postId, image }) => {
  const onClickedRecommendPost = () => {
    console.log(postId);
  };
  return (
    <div className="mainPostItem_Container" onClick={onClickedRecommendPost}>
      <div className="mainPostImage_Container">
        <img
          src={image ? NoImage : image}
          style={{ width: '147px', height: '108px' }}
        />
      </div>
      <div className="mainPostTitle_Container">{title}</div>
      <div className="mainPostTag">{categories}</div>
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
          image={recommendPost.postImage}
        />
      ))}
    </div>
  );
}
