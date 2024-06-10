import profileEdit from '../../assets/ProfileEdit.svg';
import logout from '../../assets/Logout.svg';
import memberout from '../../assets/MemberOut.svg';
import '../../styles/MyPage.scss';
import Modal from '../../component/Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();
  const [isMemberDeleteActive, setIsMemberDeleteActive] = useState(false);

  const onLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };
  return (
    <>
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
      <div className="MyPage">
        <div
          className="My_ProfileEdit"
          onClick={() => navigate('/mypage/edit')}
        >
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
      </div>
    </>
  );
}

export default MyPage;
