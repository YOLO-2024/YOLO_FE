// import YoloLogo from '../../assets/svgs/YoloLogo.svg';
import { useNavigate } from 'react-router-dom';
import '../../styles/component/layout/Header.scss';
import AlertIcon from '../../assets/svgs/AlertIcon';
import YoloLogo from '../../assets/svgs/YoloLogo';
import ProfileIcon from '../../assets/svgs/ProfileIcon';
import SearchIcon from '../../assets/svgs/SearchIcon';

export default function Header() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="headerWrapper">
        <div className="mainLogoWrapper" onClick={() => navigate('/main-page')}>
          <YoloLogo />
          <div className="contents">
            <AlertIcon />
            <ProfileIcon />
            <SearchIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
