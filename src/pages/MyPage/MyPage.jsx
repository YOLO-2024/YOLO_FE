import profileEdit from '../../assets/svgs/ProfileEdit.svg';
import logout from '../../assets/svgs/Logout.svg';
import memberout from '../../assets/svgs/MemberOut.svg';
import '../../styles/pages/MyPage.scss';
import Modal from '../../components/Modal/Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  const navigate = useNavigate();
  const [isMemberDeleteActive, setIsMemberDeleteActive] = useState(false);

  const onLogout = () => {
    sessionStorage.setItem('accessToken', null);
    navigate('/login');
  };
  return (
    <div className="MyPage">
      <div className="My_ProfileEdit" onClick={() => navigate('/MyPage/edit')}>
        <img src={profileEdit} alt="profileEdit" />
      </div>
      <div className="My_Logout" onClick={onLogout}>
        <img src={logout} alt="logout" />
      </div>
      <div
        className="My_Memberout"
        onClick={() => setIsMemberDeleteActive(true)}
      >
        <img src={memberout} alt="memberout" />
      </div>
      {isMemberDeleteActive && (
        <Modal
          actionType="Delete"
          type="MEMBER"
          title="회원 탈퇴 하시겠습니까?"
          body={
            <span>
              회원 탈퇴 시,
              <br />
              모든 데이터는 복구되지 않습니다.
            </span>
          }
          setIsActive={setIsMemberDeleteActive}
        />
      )}
    </div>
  );
}
