import { useNavigate } from 'react-router-dom';
import BackIcon from '../../assets/svgs/BackIcon';
import InterestList from '../../components/Login/InterestList';
import { useState } from 'react';

export default function InterestPage() {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  const handleClick = () => {
    navigate(-1);
  };

  const handleStart = () => {
    if (selectedInterests.length < 2) {
      // 관심사가 2개 이상 선택되지 않았다면 경고 메시지 표시
      setShowWarning(true);
    } else {
      // 관심사가 2개 이상 선택되었다면 메인 페이지로 이동
      setShowWarning(false);
      navigate(`/main-page`);
    }
  };
  return (
    <div className="headWrapper">
      <div className="gobackButton" onClick={handleClick}>
        <BackIcon />
      </div>
      <div className="styledText">관심사를 선택해주세요.</div>
      <div className="interestContainer">
        <InterestList onInterestChange={setSelectedInterests} />
      </div>
      {showWarning && (
        <div style={{ color: 'red' }}>관심사를 2개 이상 선택해주세요.</div>
      )}
      <div className={'startButton'} onClick={handleStart}>
        시작해보기
      </div>
    </div>
  );
}
