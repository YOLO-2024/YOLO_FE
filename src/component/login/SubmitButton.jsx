import Apis from '../../apis/axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import NoProfile from '../../assets/Login/NoProfile.png';

const SubmitButton = ({ imageUrl, location, nickname, introduce }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);

    const formData = new FormData();
    const dto = {
      nickname: nickname,
      location: location,
      content: introduce,
    };

    // 이미지 파일 추가
    formData.append('file', imageUrl);
    
    // 다른 데이터 추가
    formData.append(
      'updateProfileRequestDto',
      new Blob([JSON.stringify(dto)], { type: 'application/json' }),
    );

    // 서버로 POST 요청 보내기
    Apis.post(`/api/v1/member/update-profile`, formData)
      .then((response) => {
        // 성공적으로 요청을 보낸 후의 작업 수행
        navigate('/addInterest');
      })
      .catch((error) => {
        // 요청 실패 시 에러 처리
        console.error('Error updating profile:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {/* 이미지 업로드 버튼 */}
      <button
        onClick={onSubmit}
        className="addInfo_SubmitButton"
        disabled={loading} // 요청이 처리되는 동안 버튼 비활성화
      >
        {loading ? '로딩 중...' : '다음'}
      </button>
    </>
  );
};


export default SubmitButton;
