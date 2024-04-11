import '../styles/pages/MainPage.scss';
import RecommendChatting from '../components/Main/RecommendChatting';
import PopularPostList from '../components/Main/PopularPostList';
import RecommendPost from '../components/Main/RecommendPost';

export default function MainPage() {
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
    </div>
  );
}
