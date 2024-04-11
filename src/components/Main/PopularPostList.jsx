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
    { postId: 1, title: '내돈내산 후기: 가습기', tag: '기술' },
    { postId: 2, title: '내가 산 자취 꿀탬', tag: '라이프스타일' },
    { postId: 3, title: '산책 같이 갈사람', tag: '운동' },
    { postId: 4, title: '오늘의 메뉴 추천', tag: '음식' },
    { postroomId: 5, title: '요즘 빠진 게임', tag: '게임' },
  ];

  return (
    <div className="mainPost_Container">
      {postdummyList.map((dumPost) => (
        <PopularPostItem
          key={dumPost.postId}
          title={dumPost.title}
          tag={dumPost.tag}
        />
      ))}
    </div>
  );
}
