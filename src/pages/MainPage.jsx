import '../styles/pages/MainPage.scss';
// import RecommendChatting from '../components/Main/RecommendChatting';
// import PopularPostList from '../components/Main/PopularPostList';
// import RecommendPost from '../components/Main/RecommendPost';
import api from '../utils/api';
import { lazy, Suspense, useEffect, useState } from 'react';

const RecommendChatting = lazy(
  () => import('../components/Main/RecommendChatting'),
);
const RecommendPost = lazy(() => import('../components/Main/RecommendPost'));
const PopularPostList = lazy(
  () => import('../components/Main/PopularPostList'),
);

export default function MainPage() {
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const res = await api.get('/api/v1/member/profile');
        setProfileData(res.data.data);
        console.log(profileData);
      } catch (error) {
        console.log(error);
      }
    };
    getProfileData();
  }, []);

  useEffect(() => {
    console.log(profileData);
    sessionStorage.setItem('myInfo', JSON.stringify(profileData));
  }, [profileData]);

  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <div className="main_Container">
          <RecommendChatting />
          <div className="main_Post_Container">
            <div className="main_styledText">인기 있는 게시물</div>
            <PopularPostList />
          </div>
          <div className="main_Post_Container">
            <div className="main_styledText">추천 게시물</div>
            <RecommendPost />
          </div>
        </div>
      </Suspense>
    </>
  );
}
