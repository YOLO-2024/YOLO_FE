import { useNavigate } from 'react-router-dom';
import BackIcon from '../../assets/svgs/BackIcon';
import api from '../../utils/api';
import { useEffect, useState } from 'react';
import '../../styles/pages/MyPage.scss';
import InterestList from '../../components/Login/InterestList';

export default function EditInterest() {
  const user = sessionStorage.getItem('accessToken');
  // const isWriter = JSON.parse(sessionStorage.getItem('myInfo'));
  const navigate = useNavigate();
  const [interestList, setInterestList] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (interestList.length >= 2) {
      setShowWarning(false); // 관심사가 2개 이상 선택되면 경고 메시지 숨김
    } else {
      setShowWarning(true);
    }
    console.log(interestList);
  }, [interestList]);

  const handleEdit = () => {
    api
      .post(
        '/api/v1/member/update-interest',
        { interestList: interestList },
        {
          headers: {
            Authorization: `Bearer ${user}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        console.log(response), navigate('/main-page');
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="My_InterestEdit_Container">
      <div className="My_InterestEdit_header">
        <div className="gobackButton" onClick={() => navigate(-1)}>
          <BackIcon />
        </div>
        <div className="My_InterestEdit_headerText">관심사를 선택해주세요.</div>
      </div>
      <div className="My_InterestEdit_interest">
        <InterestList onInterestChange={setInterestList} />
      </div>
      {showWarning && (
        <div className="warningText">관심사를 2개 이상 선택해주세요.</div>
      )}
      <div className="My_ProfileInfo_Button">
        <button
          className="My_InterestEdit_button"
          disabled={interestList.length < 2 ? true : false}
          onClick={handleEdit}
        >
          수정
        </button>
      </div>
    </div>
  );
}
