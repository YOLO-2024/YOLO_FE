import '../../styles/component/main/MainPostList.scss';
import DummyPostImage from '../../assets/images/DummyPostImage.jpg';

const RecommendPostItem = ({ title, tag }) => {
  return (
    <div className="mainPostItem_Container">
      <div className="mainPostImage_Container">
        <img src={DummyPostImage} />
      </div>
      <div className="mainPostTitle_Container">{title}</div>
      <div className="mainPostTag">{tag}</div>
    </div>
  );
};

export default function RecommendPost() {
  const recommendPostList = [
    {
      recommendPostId: 1,
      recommendTitle: '내돈내산 후기: 가습기',
      recommendTag: '기술',
    },
    {
      recommendPostId: 2,
      recommendTitle: '내가 산 자취 꿀탬',
      recommendTag: '라이프스타일',
    },
    {
      recommendPostId: 3,
      recommendTitle: '산책 같이 갈사람',
      recommendTag: '운동',
    },
    {
      recommendPostId: 4,
      recommendTitle: '오늘의 메뉴 추천',
      recommendTag: '음식',
    },
    {
      recommendPostId: 5,
      recommendTitle: '요즘 빠진 게임',
      recommendTag: '게임',
    },
  ];

  return (
    <div className="mainPost_Container">
      {recommendPostList.map((recommendPost) => (
        <RecommendPostItem
          key={recommendPost.recommendPostId}
          title={recommendPost.recommendTitle}
          tag={recommendPost.recommendTag}
        />
      ))}
    </div>
  );
}
