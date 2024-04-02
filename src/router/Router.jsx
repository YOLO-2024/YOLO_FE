import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import MainPage from '../pages/MainPage';
import PostPage from '../pages/PostPage';
import ChatPage from '../pages/ChatPage';
import MyChatPage from '../pages/MyChatPage';
import LoginPage from '../pages/Login/LoginPage';
import AddInfoPage from '../pages/Login/AddInfoPage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/addinfo',
    element: <AddInfoPage />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/main-page',
        element: <MainPage />,
      },
      {
        path: '/post-page',
        element: <PostPage />,
      },
      {
        path: '/chat-page',
        element: <ChatPage />,
      },
      {
        path: '/mychat-page',
        element: <MyChatPage />,
      },
    ],
  },
]);

export default router;
