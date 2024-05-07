import '../../styles/common/Header.scss';
import Alarm from '../../assets/Header/Alarm.svg';
import AppLogo from '../../assets/Header/AppLogo.svg';
import Profile from '../../assets/Header/Profile.svg';
import Search from '../../assets/Header/Search.svg';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate();

    return (
      <div className="Header_Container">
        <div className="Header_Wrapper">
          <div className="AppLogo_Wrapper">
            <img src={AppLogo} alt="AppLogo" onClick={() => navigate('/')}/>
          </div>
          <div className="Icon_Wrapper">
            <img src={Alarm} alt="Alarm" onClick={() => navigate('/')}/>
            <img src={Profile} alt="Profile" onClick={() => navigate('/')}/>
            <img src={Search} alt="Search" onClick={() => navigate('/search')}/>
          </div>
        </div>
      </div>
    );
};

export default Header;