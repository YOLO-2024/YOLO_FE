import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import MainPage from '../pages/MainPage';
import PostPage from '../pages/PostPage';
import ChatPage from '../pages/ChatPage';
import MyChatPage from '../pages/MyChatPage';
import NewPost from '../pages/Post/NewPost';
import CheckPost from '../pages/Post/CheckPost';
import EditPost from '../pages/Post/EditPost';
import LoginPage from '../pages/Login/LoginPage';
import AddInfoPage from '../pages/Login/AddInfoPage';
import TestPage from '../pages/Login/\bTestPage';
import InterestPage from '../pages/Login/InterestPage';
import SearchPage from '../pages/Search/SearchPage';
import CreateChat from '../pages/Chat/CreateChat';
import JoinChatPage from '../pages/Chat/JoinChatPage';

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
    path: '/addinfo/interest',
    element: <InterestPage />,
  },
  {
    path: '/searchpage',
    element: <SearchPage />,
  },
  {
    path: '/testpage',
    element: <TestPage />,
  },
  {
    path: '/chat-page/new',
    element: <CreateChat />,
  },
  {
    path: '/chat-page/join/:chatroomId',
    element: <JoinChatPage />,
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
  { path: '/post-page/new', element: <NewPost /> },
  { path: '/post-page/check/:postId', element: <CheckPost /> },
  { path: '/post-page/edit/:postId', element: <EditPost /> },
]);

export default router;
