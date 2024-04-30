import '../styles/pages/MainPage.scss';
import RecommendChatting from '../components/Main/RecommendChatting';
import PopularPostList from '../components/Main/PopularPostList';
import RecommendPost from '../components/Main/RecommendPost';
import { api } from '../utils/customAxios';
// import { useRecoilValue } from 'recoil';
// import { accessTokenState, refreshTokenState } from '../state/AuthState';
import axios from 'axios';
import LogoutButton from '../components/Login/LogoutButton';
import { useNavigate } from 'react-router-dom'; // React Router v6 사용 시

export default function MainPage() {
  const navigate = useNavigate();
  const userToken = sessionStorage.getItem('accessToken');
  // const userRefreshToken = sessionStorage.getItem('refreshToken');

  const onResignClick = async () => {
    const confirmLogout = window.confirm('회원탈퇴 하시겠습니까?');

    if (confirmLogout) {
      await api.delete('/api/v1/auth/resign', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        'Content-Type': 'application/json',
      });

      navigate('/login');
    }
  };
  return (
    <>
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
        <LogoutButton />
        <button onClick={onResignClick}>회원탈퇴</button>
      </div>
    </>
  );
}
