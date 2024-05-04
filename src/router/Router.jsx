import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout'

import AddInfoPage from '../pages/login/AddInfoPage';
import AddInterestPage from '../pages/login/AddInterestPage';
import LoginPage from '../pages/login/LoginPage';

import MainPage from '../pages/main/MainPage';

import PostListPage from '../pages/post/PostListPage';
import CreatePostPage from '../pages/post/CreatePostPage';
import PostPage from '../pages/post/PostPage';
import EditPostPage from '../pages/post/EditPostPage';

import SearchPage from '../pages/search/SearchPage';

import ChatPage from '../pages/chat/ChatPage';
import ChatRoomListPage from '../pages/chat/ChatRoomListPage';
import MyChatRoomListPage from '../pages/chat/MyChatRoomListPage';
import CreateChatRoomPage from '../pages/chat/CreateChatRoomPage';
import EnterChatRoomPage from '../pages/chat/EnterChatRoomPage';
import EditChatRoomPage from '../pages/chat/EditChatRoomPage';


const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/addInfo',
    element: <AddInfoPage />,
  },
  {
    path: '/addInterest',
    element: <AddInterestPage />,
  },
  {
    path: '/search',
    element: <SearchPage />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/postList',
        element: <PostListPage />,
      },
      {
        path: '/chatroom',
        element: <ChatRoomListPage />,
      },
      {
        path: '/myChatroom',
        element: <MyChatRoomListPage />,
      },
    ],
  },
  { path: '/post/create', element: <CreatePostPage /> },
  { path: '/post/:postId', element: <PostPage /> },
  { path: '/post/edit/:postId', element: <EditPostPage /> },

  { path: '/chatroom/:roomId', element: <ChatPage /> },
  { path: '/chatroom/enter/:roomId', element: <EnterChatRoomPage /> },
  { path: '/chatroom/create', element: <CreateChatRoomPage /> },
  { path: '/chatroom/edit/:roomId', element: <EditChatRoomPage /> },
]);

export default router;
