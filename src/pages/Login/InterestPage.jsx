import { useNavigate } from 'react-router-dom';
import BackIcon from '../../assets/svgs/BackIcon';
import InterestList from '../../components/Login/InterestList';
import { useEffect, useState } from 'react';
import '../../styles/pages/login/InterestPage.scss';
//import { accessTokenState } from '../../state/AuthState';
import api from '../../utils/api';
//import axios from 'axios';
//import { useRecoilValue } from 'recoil';

export default function InterestPage() {
  const navigate = useNavigate();
  const [interestList, setInterestList] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  const handleClick = () => {
    navigate(-1);
  };

  const handleStart = async () => {
    if (interestList.length < 2) {
      // 관심사가 2개 이상 선택되지 않았다면 경고 메시지 표시
      setShowWarning(true);
    } else {
      setShowWarning(false);

      try {
        await api.post(
          '/api/v1/member/update-interest',
          { interestList: interestList },
          {
            'Content-Type': 'application/json',
          },
        );
      } catch (error) {
        console.error(error);
      }
      navigate(`/main-page`);
    }
  };

  useEffect(() => {
    if (interestList.length >= 2) {
      setShowWarning(false); // 관심사가 2개 이상 선택되면 경고 메시지 숨김
    }
    console.log(interestList);
  }, [interestList]);

  // import.meta.env.VITE_CLIENT_URL
  return (
    <div className="interest_headWrapper">
      <div className="title_Container">
        <div className="gobackButton" onClick={handleClick}>
          <BackIcon />
        </div>
        <div className="styledText">관심사를 선택해주세요.</div>
      </div>
      <div className="interestContainer">
        <InterestList onInterestChange={setInterestList} />
      </div>
      {showWarning && (
        <div className="warningText">관심사를 2개 이상 선택해주세요.</div>
      )}
      <div className="startButton" onClick={handleStart}>
        시작해보기
      </div>
    </div>
  );
}
