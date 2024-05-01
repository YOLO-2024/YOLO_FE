import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/post/PostPage.scss';
import Edit from '../../assets/post/Edit.svg';
import DeletePost from '../../assets/post/DeletePost.svg';
import Notification from '../../assets/post/Notification.svg';
import backButton from '../../assets/Login/interest/backButton.svg';
import NoProifle from '../../assets/Login/NoProfile.png';
import like from '../../assets/post/like.svg';
import commentCount from '../../assets/post/commentCount.svg';
import likeCount from '../../assets/post/likeCount.svg';
import reviewCount from '../../assets/post/reviewCount.svg';
import Apis from '../../apis/axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from '../../component/Modal';

const PostPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    console.log(state)
    const memberState = JSON.parse(sessionStorage.getItem('memberState'));
    console.log(memberState);

    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([]);
    const [id, setId] = useState(null);

    const [isPostDeleteActive, setIsPostDeleteActive] = useState(false);
    const [isCommentDeleteActive, setIsCommentDeleteActive] = useState(false);
    const [isPostDeclarationActive, setIsPostDeclarationActive] = useState(false);
    const [isCommentDeclarationActive, setIsCommentDeclarationActive] = useState(false);

    useEffect(() => {
        Apis.get(
          `/api/v1/comment/check/${state.postInfo.postInfo.postId}`
        ).then((response) => {
            setCommentList(response.data.data)
        })
    }, [])
    console.log(commentList);

    const dateFormatter = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const formattedDateTime = `${dateTime.getFullYear()}.${String(dateTime.getMonth() + 1).padStart(2, '0')}.${String(dateTime.getDate()).padStart(2, '0')} ${String(dateTime.getHours()).padStart(2, '0')}:${String(dateTime.getMinutes()).padStart(2, '0')}`;
        return formattedDateTime;
    };

    const onClickLike = () => {
        Apis.post(`/api/v1/post/like/${state.postInfo.postInfo.postId}`)
        .then((response) => {
            alert(response.data.data)
        }).catch((err) => {
            alert(err.response.data.message)
        })
    }

    const onSubmitComment = (e) => {
         e.preventDefault();
        Apis.post('/api/v1/comment/create', {
          postId: state.postInfo.postInfo.postId,
          content : comment
        }).then((response) => {
            window.location.reload();
            console.log(response.data.data)
        })
    }


  return (
    <>
      {/* 포스트 삭제 */}
      {isPostDeleteActive && (
        <Modal
          actionType="Delete"
          type="POST"
          title="포스트를 삭제하시겠습니까?"
          body="포스트가 삭제되면, 복구되지 않습니다."
          setIsActive={setIsPostDeleteActive}
          id={id}
        />
      )}
      {/* 댓글 삭제 */}
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
          id={id}
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
      <div className="PostPage_Header">
        <img
          src={backButton}
          className="PostPage_Header_Back"
          onClick={() => navigate('/postList')}
        />
        {state.postInfo.writerInfo.nickname ===
          memberState.profileInfo.nickname && (
          <img
            src={Edit}
            className="PostPage_Header_Edit"
            onClick={() =>
              navigate('/post/edit/' + state.postInfo.postInfo.postId)
            }
          />
        )}
        <img
          src={Notification}
          className="PostPage_Header_Notification"
          onClick={() => {
            setId(state.postInfo.postInfo.postId);
            setIsPostDeclarationActive(true);
          }}
        />
        {state.postInfo.writerInfo.nickname ===
          memberState.profileInfo.nickname && (
          <img
            src={DeletePost}
            className="PostPage_Header_Delete"
            onClick={() => {
              setId(state.postInfo.postInfo.postId);
              setIsPostDeleteActive(true);
            }}
          />
        )}
      </div>
      <div className="PostPage_Container">
        <div className="PostPage_Wrapper">
          <div className="PostPage_TopBar">
            <img
              src={
                state.postInfo.writerInfo.profileImage
                  ? state.postInfo.writerInfo.profileImage.imageUrl
                  : NoProifle
              }
              className="PostPage_TopBar_Image"
            />
            <div className="PostPage_TopBar_TextBox">
              <div className="PostPage_TopBar_TextBox_Nickname">
                {state.postInfo.writerInfo.nickname}
              </div>
              <div className="PostPage_TopBar_TextBox_CreatedAt">
                {dateFormatter(state.postInfo.postInfo.createdAt)}
              </div>
            </div>
            <div className="PostPage_TopBar_TextBox_Like" onClick={onClickLike}>
              <img src={like} className="PostPage_TopBar_TextBox_Like_Image" />
              <div className="PostPage_TopBar_TextBox_Like_Text">좋아요</div>
            </div>
          </div>
          <div className="PostPage_TitleBox">
            <div className="PostPage_TitleBox_Title">
              {state.postInfo.postInfo.title}
            </div>
            <div className="PostPage_TitleBox_Categories">
              {state.postInfo.postInfo.categories.map((interest, index) => (
                <div key={index}>{'#' + interest}&nbsp;</div>
              ))}
            </div>
          </div>
          <div className="PostPage_Contents">
            {state.postInfo.postInfo.content}
          </div>
          <div className="PostPage_ImageList">
            {state.postInfo.postImage.map((image, index) => (
              <img
                key={index}
                src={image.imageUrl}
                className="PostPage_Image"
              />
            ))}
          </div>
          <div className="PostPage_Post_Count">
            <img src={likeCount} className="PostPage_Post_Count_Icon" />
            <div className="PostPage_Post_Count_Text">
              {state.postInfo.postInfo.likeCount}
            </div>
            <img src={commentCount} className="PostPage_Post_Count_Icon" />
            <div className="PostPage_Post_Count_Text">
              {state.postInfo.postInfo.likeCount}
            </div>
            <img src={reviewCount} className="PostPage_Post_Count_Icon" />
            <div className="PostPage_Post_Count_Text">
              {state.postInfo.postInfo.reviewCount}
            </div>
          </div>
        </div>
        <div className="PostPage_Comment_Wrapper">
          {commentList.length > 0 &&
            commentList.map((comment) =>
              comment.writerInfo.nickname ===
              memberState.profileInfo.nickname ? (
                <div
                  key={comment.commentInfo.commentId}
                  className="PostPage_Comment_MyCommentBox"
                >
                  <div className="PostPage_Comment_MyCommentBox_Top">
                    <div className="PostPage_Comment_MyCommentBox_Nickname">
                      {state.postInfo.writerInfo.nickname}
                    </div>
                    <img
                      src={
                        state.postInfo.writerInfo.profileImage
                          ? state.postInfo.writerInfo.profileImage.imageUrl
                          : NoProifle
                      }
                      className="PostPage_Comment_MyCommentBox_Image"
                    />
                  </div>
                  <div className="PostPage_Comment_MyCommentBox_CommentBox">
                    <div className="PostPage_Comment_MyCommentBox_Comment">
                      {comment.commentInfo.content}
                    </div>
                    <img
                      src={DeletePost}
                      onClick={() => {
                        setId(comment.commentInfo.commentId);
                        setIsCommentDeleteActive(true);
                      }}
                      className="PostPage_Comment_MyCommentBox_Icon"
                    />
                  </div>
                </div>
              ) : (
                <div
                  key={comment.commentInfo.commentId}
                  className="PostPage_Comment_OtherCommentBox"
                >
                  <div className="PostPage_Comment_OtherCommentBox_Top">
                    <img
                      src={
                        comment.writerInfo.profileImage
                          ? comment.writerInfo.profileImage.imageUrl
                          : NoProifle
                      }
                      className="PostPage_Comment_OtherCommentBox_Image"
                    />
                    <div className="PostPage_Comment_OtherCommentBox_Nickname">
                      {comment.writerInfo.nickname}
                    </div>
                  </div>
                  <div className="PostPage_Comment_OtherCommentBox_CommentBox">
                    <div className="PostPage_Comment_OtherCommentBox_Comment">
                      {comment.commentInfo.content}
                    </div>
                    <img
                      src={Notification}
                      onClick={() => {
                        setId(comment.commentInfo.commentId);
                        setIsCommentDeclarationActive(true);
                      }}
                      className="PostPage_Comment_OtherCommentBox_Icon"
                    />
                  </div>
                </div>
              ),
            )}
        </div>
      </div>
      <div className="PostPage_BottomBar">
        <textarea
          className="PostPage_BottomBar_Input"
          type="text"
          cols="2"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button
          className="PostPage_BottomBar_Button"
          onClick={onSubmitComment}
          disabled={comment === '' ? true : false}
        >
          확인
        </button>
      </div>
    </>
  );
};

export default PostPage;
