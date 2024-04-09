import Comment from './Comment.json';
import '../../styles/pages/Post/CommentList.scss';
import NotificationModal from '../../components/Modal/NotificationModal';
import { useState } from 'react';

import { NotificationMiniIcon } from '../../assets/svgs/NofificationMiniIcon';

//댓글 나열 컴포넌트
export default function CommentList({ postId, postWriter }) {
  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);
  const toggleNotificaionModal = () => {
    setNotificationModalOpen(!isNotificationModalOpen);
  };

  const filteredComments = Comment.data.filter(
    (item) => String(item.postId) === String(postId),
  );

  return (
    <div className="totalComment">
      {filteredComments.map((item) => (
        <div className="comment-container" key={`${postId}_${item.commentId}`}>
          <div className="commentWriter">
            {postWriter === item.commentWriterDto.writer ? (
              <div>{item.commentWriterDto.writer}</div>
            ) : (
              <div>
                {item.commentWriterDto.writer}
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
