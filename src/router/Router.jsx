import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

import SearchPage from '../pages/Search/SearchPage';

import LoginPage from '../pages/Login/LoginPage';
import AddInfoPage from '../pages/Login/AddInfoPage';
import InterestPage from '../pages/Login/InterestPage';

import MainPage from '../pages/MainPage';

import PostPage from '../pages/PostPage';
import NewPost from '../pages/Post/NewPost';
import CheckPost from '../pages/Post/CheckPost';
import EditPost from '../pages/Post/EditPost';

import ChatPage from '../pages/ChatPage';
import CreateChat from '../pages/Chat/CreateChat';
import JoinChatPage from '../pages/Chat/JoinChatPage';

import MyChatPage from '../pages/MyChatPage';

import TestPage from '../pages/Login/\bTestPage';
import EditChatRoom from '../pages/Chat/EditChatRoom';
import MyPage from '../pages/MyPage/MyPage';
import EditProfile from '../pages/MyPage/EditProfilePage';
import EditInterest from '../pages/MyPage/EditInterestPage';

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
    path: '/chat-page/edit/:chatroomId',
    element: <EditChatRoom />,
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
      {
        path: '/MyPage',
        element: <MyPage />,
      },
      { path: '/MyPage/edit', element: <EditProfile /> },
    ],
  },
  { path: '/post-page/new', element: <NewPost /> },
  { path: '/post-page/check/:postId', element: <CheckPost /> },
  { path: '/post-page/edit/:postId', element: <EditPost /> },
  { path: '/MyPage/edit/interest', element: <EditInterest /> },
]);

export default router;
