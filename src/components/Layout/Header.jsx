// import YoloLogo from '../../assets/svgs/YoloLogo.svg';
import { useNavigate } from 'react-router-dom';
import '../../styles/component/layout/Header.scss';
import AlertIcon from '../../assets/svgs/AlertIcon';
import YoloLogo from '../../assets/svgs/YoloLogo';
import ProfileIcon from '../../assets/svgs/ProfileIcon';
import SearchIcon from '../../assets/svgs/SearchIcon';

export default function Header() {
  const navigate = useNavigate();

  const onClickToHome = () => {
    navigate('/main-page');
  };

  const handleSearchIcon = (event) => {
    event.stopPropagation();
    navigate('/searchpage');
  };

  return (
    <div className="header_Container">
      <div className="header_Logo" onClick={onClickToHome}>
        <YoloLogo />
      </div>
      <div className="header_Icon_List">
        <div className="header_Icon">
          <AlertIcon />
        </div>
        <div className="header_Icon" onClick={() => navigate('/MyPage')}>
          <ProfileIcon />
        </div>
        <div
          className="header_Icon"
          onClick={(event) => handleSearchIcon(event)}
        >
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}
