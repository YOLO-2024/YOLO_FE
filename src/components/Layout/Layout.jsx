import { Outlet } from 'react-router-dom';
import '../../styles/component/layout/Layout.scss';
import BottomNavBar from './BottomNavBar';
import Header from './Header';

export default function Layout() {
  return (
    <>
      <div className="wrapper">
        <div className="headerWrapper">
          <Header />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
      <div className="footer">
        <BottomNavBar />
      </div>
    </>
  );
}
