import Comment from './Comment.json';
import '../../styles/pages/Post/CommentList.scss';
import NotificationModal from '../../components/Modal/NotificationModal';
import { useState } from 'react';
import { NotificationMiniIcon } from '../../assets/svgs/NofificationMiniIcon';
import { DeleteMiniIcon } from '../../assets/svgs/DeleteMiniIcon';
import DeleteModal from '../../components/Modal/DeleteModal';
import UserIcon from '../../assets/svgs/post.png';

//댓글 나열 컴포넌트
export default function CommentList({ postId, postWriter }) {
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const toggleNotificaionModal = () => {
    setNotificationModalOpen(!isNotificationModalOpen);
  };
  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const filteredComments = Comment.data.filter(
    (item) => String(item.postId) === String(postId),
  );

  return (
    <div className="totalComment">
      {filteredComments.map((item) => (
        <div className="comment-container" key={`${postId}_${item.commentId}`}>
          <div>
            {postWriter === item.commentWriterDto.writer ? (
              <div className="commentWriter">
                <div className="DeleteIcon" onClick={toggleDeleteModal}>
                  <DeleteMiniIcon />
                  <DeleteModal
                    isOpen={isDeleteModalOpen}
                    toggleModal={toggleDeleteModal}
                    type={'댓글을'}
                  />
                </div>
                <div className="commentWriterInfo">
                  {item.commentWriterDto.writer}
                  {
                    <div>
                      <img className="UserIcon" src={UserIcon} alt="userIcon" />
                    </div>

                    /* <div>{item.commentWriterDto.image.imageUrl}</div> */
                  }
                </div>
              </div>
            ) : (
              <div className="commentWriter">
                <div className="commentWriterInfo">
                  {item.commentWriterDto.writer}
                  {
                    <div>
                      <img className="UserIcon" src={UserIcon} alt="userIcon" />
                    </div>

                    /* <div>{item.commentWriterDto.image.imageUrl}</div> */
                  }
                </div>
                <div
                  className="NotificationIcon"
                  onClick={toggleNotificaionModal}
                >
                  <NotificationMiniIcon />
                  <NotificationModal
                    isOpen={isNotificationModalOpen}
                    toggleModal={toggleNotificaionModal}
                    type={'댓글을'}
                  />
                </div>
              </div>
            )}
          </div>
          <div
            className={
              postWriter === item.commentWriterDto.writer
                ? `Writer${'commentContent'}`
                : 'commentContent'
            }
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
