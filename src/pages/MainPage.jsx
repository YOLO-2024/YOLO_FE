import '../styles/pages/MainPage.scss';
import RecommendChatting from '../components/Main/RecommendChatting';
import PopularPostList from '../components/Main/PopularPostList';
import RecommendPost from '../components/Main/RecommendPost';
// import { api } from '../utils/customAxios';
import { useRecoilValue } from 'recoil';
import { accessTokenState, refreshTokenState } from '../state/AuthState';
import axios from 'axios';

export default function MainPage() {
  const respon = useRecoilValue(accessTokenState);
  const reff = useRecoilValue(refreshTokenState);

  console.log(respon);
  console.log(reff);
  const onLogoutClick = async () => {
    await axios.delete(
      `${import.meta.env.VITE_CLIENT_URL}/api/v1/auth/resign`,
      {
        headers: {
          Authorization: 'Bearer ' + respon,
        },
        'Content-Type': 'application/json',
      },
    );
  };
  return (
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
      <button onClick={onLogoutClick}>로그아웃</button>
    </div>
  );
}
