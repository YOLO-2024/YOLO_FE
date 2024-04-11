import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/component/layout/BottomNavBar.scss';
import MainIcon from '../../assets/svgs/MainIcon';
import ChatIcon from '../../assets/svgs/ChatIcon';
import PostIcon from '../../assets/svgs/PostIcon';
import MyChatIcon from '../../assets/svgs/MyChatIcon';

export default function BottomNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState('');

  useEffect(() => {
    const currentPath = location.pathname.slice(1);

    setActive(currentPath);
  }, [location]);

  const handleClick = (value) => {
    navigate(`/${value}`);
    setActive(value);
    console.log(active);
  };

  return (
    <div className="bottomNavBarWrapper">
      <div className="bottomIconBox" onClick={() => handleClick('main-page')}>
        <MainIcon fill={active === 'main-page' ? '#266ED7' : '#D3D1D8'} />
      </div>
      <div className="bottomIconBox" onClick={() => handleClick('post-page')}>
        <PostIcon fill={active === 'post-page' ? '#266ED7' : '#D3D1D8'} />
      </div>
      <div className="bottomIconBox" onClick={() => handleClick('chat-page')}>
        <ChatIcon fill={active === 'chat-page' ? '#266ED7' : '#D3D1D8'} />
      </div>
      <div className="bottomIconBox" onClick={() => handleClick('mychat-page')}>
        <MyChatIcon fill={active === 'mychat-page' ? '#266ED7' : '#D3D1D8'} />
      </div>
    </div>
  );
}
