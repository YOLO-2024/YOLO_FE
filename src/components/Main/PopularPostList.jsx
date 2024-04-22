import '../../styles/component/main/MainPostList.scss';
import DummyPostImage from '../../assets/images/DummyPostImage.jpg';

const PopularPostItem = ({ title, tag }) => {
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

export default function PopularPostList() {
  const postdummyList = [
    { postId: 1, popularTitle: '내돈내산 후기: 가습기', tags: '기술' },
    { postId: 2, popularTitle: '내가 산 자취 꿀탬', tags: '라이프스타일' },
    { postId: 3, popularTitle: '산책 같이 갈사람', tags: '운동' },
    { postId: 4, popularTitle: '오늘의 메뉴 추천', tags: '음식' },
    { postId: 5, popularTitle: '요즘 빠진 게임', tags: '게임' },
  ];

  return (
    <div className="mainPost_Container">
      {postdummyList.map((dumPost) => (
        <PopularPostItem
          key={dumPost.postId}
          title={dumPost.popularTitle}
          tag={dumPost.tags}
        />
      ))}
    </div>
  );
}
