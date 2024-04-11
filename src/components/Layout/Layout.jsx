import { Outlet } from 'react-router-dom';
import '../../styles/component/layout/Layout.scss';
import BottomNavBar from './BottomNavBar';
import Header from './Header';

export default function Layout() {
  return (
    <div className="Layout_Container">
      <div className="header_Container">
        <Header />
      </div>
      <div className="content_Container">
        <Outlet />
      </div>
      <div className="footer_Container">
        <BottomNavBar />
      </div>
    </div>
  );
}
