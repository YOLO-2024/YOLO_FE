import '../styles/pages/Splash.scss';
import splash_logo from '../assets/svgs/splash_logo.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Splash() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    navigate('/login');
  }

  return (
    <div className="splash_Container">
      <div className="splash_Header">
        <span className="splash_Text">1인 가구를</span>
        <span className="splash_Text">위한</span>
        <span className="splash_Text">소셜 커뮤니티</span>
      </div>
      <div className="splash_Logo">
        <img src={splash_logo} alt="Splash Logo" />
      </div>
    </div>
  );
}
