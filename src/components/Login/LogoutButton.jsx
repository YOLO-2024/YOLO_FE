import { useNavigate } from 'react-router-dom'; // React Router v6 사용 시
// import { accessTokenState, refreshTokenState } from '../../state/AuthState';

const LogoutButton = () => {
  const navigate = useNavigate(); // React Router v6 사용 시

  const handleLogout = () => {
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');

    if (confirmLogout) {
      // 토큰 상태를 초기화
      sessionStorage.setItem('accessToken', null);
      navigate('/login');
    }
  };

  return <button onClick={handleLogout}>로그아웃</button>;
};

export default LogoutButton;
