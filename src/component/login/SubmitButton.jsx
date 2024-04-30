import Apis from '../../apis/axios';
import { useNavigate } from 'react-router-dom';

const SubmitButton = ({ imageUrl, location, nickname, introduce }) => {
  const navigate = useNavigate();

  const onSubmit = () => {
    const formData = new FormData();
    // 이미지 파일 추가
    formData.append('file', imageUrl);
    // 다른 데이터 추가
    formData.append(
      'updateProfileRequestDto',
      new Blob(
        [
          JSON.stringify({
            nickname: nickname,
            location: location,
            content: introduce,
          }),
        ],
        { type: 'application/json' },
      ),
    );
    Apis.post(`/api/v1/member/update-profile`, formData)
    navigate('/addInterest')
  };

  return (
    <>
      {/* 이미지 업로드 버튼 */}
      <button
        onClick={onSubmit}
        className={
          !nickname || !location
            ? 'addInfo_DisableButton'
            : 'addInfo_SubmitButton'
        }
        disabled={!nickname || !location ? true : false}
      >
        다음
      </button>
    </>
  );
};


export default SubmitButton;
