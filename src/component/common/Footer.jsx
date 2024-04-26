import '../../styles/common/Footer.scss';
import Main from '../../assets/Footer/Main.svg';
import PostList from '../../assets/Footer/PostList.svg';
import ChatRoom from '../../assets/Footer/ChatRoom.svg';
import MyChatRoom from '../../assets/Footer/MyChatRoom.svg';
import ActiveMain from '../../assets/Footer/ActiveMain.svg';
import ActivePostList from '../../assets/Footer/ActivePostList.svg';
import ActiveChatRoom from '../../assets/Footer/ActiveChatRoom.svg';
import ActiveMyChatRoom from '../../assets/Footer/ActiveMyChatRoom.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const footerIcon = [
  {
    id: 'main',
    src: Main,
    active: ActiveMain,
    alt: 'main',
    route: '/',
  },
  {
    id: 'postList',
    src: PostList,
    active: ActivePostList,
    alt: 'postList',
    route: '/postList',
  },
  {
    id: 'chatRoom',
    src: ChatRoom,
    active: ActiveChatRoom,
    alt: 'chatRoom',
    route: '/chatroom',
  },
  {
    id: 'myChatroom',
    src: MyChatRoom,
    active: ActiveMyChatRoom,
    alt: 'myChatroom',
    route: '/myChatroom',
  },
];


const Footer = () => {
    const navigate = useNavigate();
    let location = useLocation();

    // TODO: SVG 색상 변경
    return (
      <div className="Footer_Container">
        <div className="Footer_Wrapper">
          {footerIcon.map((footer) => (
            <div className="Footer_Icon_Wrapper" key={footer.id}>
              <img
                src={(location.pathname !== footer.route) ?  footer.src : footer.active }
                alt={footer.alt}
                onClick={() => navigate(footer.route)}
              />
            </div>
          ))}
        </div>
      </div>
    );
};

export default Footer;