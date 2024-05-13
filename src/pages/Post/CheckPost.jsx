import { ModeEditIcon } from '../../assets/svgs/ModeEditIcon';
import { NotificationIcon } from '../../assets/svgs/NotificationIcon';
import { DeleteIcon } from '../../assets/svgs/DeleteIcon';
import '../../styles/pages/Post/CheckPost.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PreviousIcon } from '../../assets/svgs/PreviousIcon';
import defaultImage from '../../assets/images/basicProfile.jpg';
import LikeWhiteIcon from '../../assets/svgs/LikeWhiteIcon';
import { CommentIcon } from '../../assets/svgs/CommentIcon';
import { LikeIcon } from '../../assets/svgs/LikeIcon';
import { ReviewIcon } from '../../assets/svgs/ReviewIcon';
import { api } from '../../utils/customAxios';
import { NotificationMiniIcon } from '../../assets/svgs/NofificationMiniIcon';
import { DeleteMiniIcon } from '../../assets/svgs/DeleteMiniIcon';
import Modal from '../../components/Modal/Modal';

//포스트 상세페이지
export default function CheckPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const postData = { ...location.state };

  const [isPostDeleteActive, setIsPostDeleteActive] = useState(false);
  const [isCommentDeleteActive, setIsCommentDeleteActive] = useState(false);
  const [isPostDeclarationActive, setIsPostDeclarationActive] = useState(false);
  const [isCommentDeclarationActive, setIsCommentDeclarationActive] =
    useState(false);

  const user = sessionStorage.getItem('accessToken');
  const writer = JSON.parse(sessionStorage.getItem('myInfo')).profileInfo
    .nickname;
  // const isWriter = postData.writerInfo.nickname === writer;
  const [id, setId] = useState(null);
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);

  console.log(postData);
  useEffect(() => {
    api
      .get(`/api/v1/comment/check/${postData.postInfo.postId}`, {
        headers: { Authorization: `Bearer ${user}` },
      })
      .then((response) => {
        setCommentList(response.data.data);
      })
      .catch((error) => {
        console.log('comment', error);
      });

    api.post(
      `/api/v1/post/increase/${postData.postInfo.postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${user}`,
          'Content-Type': 'application/json',
        },
      },
    );
  }, []);

  const dateFormatter = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const formattedDateTime = `${dateTime.getFullYear()}.${String(dateTime.getMonth() + 1).padStart(2, '0')}.${String(dateTime.getDate()).padStart(2, '0')} ${String(dateTime.getHours()).padStart(2, '0')}:${String(dateTime.getMinutes()).padStart(2, '0')}`;
    return formattedDateTime;
  };

  // console.log(postData);
  // console.log(comment);
  // console.log(commentList);

  const handleComment = () => {
    api
      .post(
        '/api/v1/comment/create',
        {
          postId: postData.postInfo.postId,
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${user}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        console.log('comment post', response);
        setComment('');
      })
      .catch((error) => {
        console.log('comment post', error);
      });
  };
  const handleLikeCount = async () => {
    await api
      .post(
        `/api/v1/post/like/${postData.postInfo.postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        console.log('포스트 좋아요', response);
      })
      .catch((error) => {
        console.log('포스트 좋아요: ', error);
      });
  };

  return (
    <>
      <div className="Post_Header">
        <div className="previousIcon" onClick={() => navigate(-1)}>
          <PreviousIcon />
        </div>
        <div className="Post_Header_options">
          {postData.writerInfo.nickname === writer && (
            <div
              onClick={() =>
                navigate(`/post-page/edit/${postData.postInfo.postId}`, {
                  state: postData,
                })
              }
            >
              <ModeEditIcon />
            </div>
          )}
          <div onClick={() => setIsPostDeclarationActive(true)}>
            <NotificationIcon />
          </div>
          {postData.writerInfo.nickname === writer && (
            <div onClick={() => setIsPostDeleteActive(true)}>
              <DeleteIcon />
            </div>
          )}
        </div>
      </div>
      {isPostDeleteActive && (
        <Modal
          actionType="Delete"
          type="POST"
          title="포스트를 삭제하시겠습니까?"
          body="포스트가 삭제되면, 복구되지 않습니다."
          setIsActive={setIsPostDeleteActive}
          id={postData.postInfo.postId}
        />
      )}
      {isCommentDeleteActive && (
        <Modal
          actionType="Delete"
          type="COMMENT"
          title="댓글을 삭제하시겠습니까?"
          body="댓글이 삭제되면, 복구되지 않습니다."
          setIsActive={setIsCommentDeleteActive}
          id={id}
        />
      )}
      {isPostDeclarationActive && (
        <Modal
          actionType="Declaration"
          type="POST"
          title="포스트를 신고 하시겠습니까?"
          body="신고 접수 확인 후, 조치하겠습니다."
          setIsActive={setIsPostDeclarationActive}
          id={postData.postInfo.postId}
        />
      )}
      {isCommentDeclarationActive && (
        <Modal
          actionType="Declaration"
          type="COMMENT"
          title="댓글을 신고 하시겠습니까?"
          body="신고 접수 확인 후, 조치하겠습니다."
          setIsActive={setIsCommentDeclarationActive}
          id={id}
        />
      )}

      <div className="Post_CommentInput_Container">
        <textarea
          className="Post_CommentInput"
          placeholder="댓글을 입력해주세요."
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button
          className="Post_CommentInput_Checkbutton"
          onClick={handleComment}
          disabled={comment === '' ? true : false}
        >
          확인
        </button>
      </div>
      <div className="Post_WriterContainer">
        <img
          className="Post_WriterIcon"
          src={
            postData.writerInfo.profileImage
              ? postData.writerInfo.profileImage.imageUrl
              : defaultImage
          }
        />
        <div>
          <div className="Post_WriterName">{postData.writerInfo.nickname}</div>
          <div className="Post_CreatedAt">
            {dateFormatter(postData.postInfo.createdAt)}
          </div>
        </div>
        <div className="Post_likeButton" onClick={handleLikeCount}>
          <LikeWhiteIcon />
          좋아요
        </div>
      </div>
      <div className="Post_TitleContainer">
        <div className="Post_Title">{postData.postInfo.title}</div>

        <div className="Post_Category">
          {postData.postInfo.categories.map((category, index) => (
            <span key={index}>#{category.trim()} </span>
          ))}
        </div>
      </div>
      <div className="Post_Content">{postData.postInfo.content}</div>
      <div className="Post_ImageContainer">
        {postData.postImage &&
          postData.postImage.map((img, index) => (
            <img key={index} className="Post_Image" src={img.imageUrl} />
          ))}
      </div>
      <div className="Post_CountContainer">
        <div className="Post_likeIcon">
          <LikeIcon />
          {postData.postInfo.likeCount}
        </div>
        <div>
          <CommentIcon />
        </div>
        <div className="Post_reviewIcon">
          <ReviewIcon />
          {postData.postInfo.reviewCount}
        </div>
      </div>

      <div className="Post_CommentContainer">
        {commentList.length > 0 &&
          commentList.map((comment) => (
            <div
              key={comment.commentInfo.commentId}
              className="Post_CommentWrapper"
            >
              {comment.writerInfo.nickname === writer ? (
                <div className="Post_MyComment">
                  <div className="Post_MyComment_WriterBox">
                    <div className="Post_MyCommentWriter">
                      {comment.writerInfo.nickname}
                    </div>
                    <img
                      src={
                        comment.writerInfo.profileImage
                          ? comment.writerInfo.profileImage.imageUrl
                          : defaultImage
                      }
                      className="Post_CommentImage"
                    />
                  </div>
                  <div className="Post_MyCommentContent">
                    {comment.commentInfo.content}
                  </div>
                  <div
                    className="Post_CommentDeleteIcon"
                    onClick={() => {
                      setIsCommentDeleteActive(true);
                      setId(comment.commentInfo.commentId);
                    }}
                  >
                    <DeleteMiniIcon />
                  </div>
                </div>
              ) : (
                <div className="Post_OtherComment">
                  <div className="Post_OtherComment_WriterBox">
                    <img
                      src={
                        comment.writerInfo.profileImage
                          ? comment.writerInfo.profileImage
                          : defaultImage
                      }
                      className="Post_CommentImage"
                    />
                    <div className="Post_OtherCommentWriter">
                      {comment.writerInfo.nickname}
                    </div>
                  </div>
                  <div className="Post_OtherCommentContent">
                    {comment.commentInfo.content}
                  </div>
                  <div
                    className="Post_CommentNotificationIcon"
                    onClick={() => setIsCommentDeclarationActive(true)}
                  >
                    <NotificationMiniIcon />
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
}
