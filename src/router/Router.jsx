import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import MainPage from '../pages/MainPage';
import PostPage from '../pages/PostPage';
import ChatPage from '../pages/ChatPage';
import MyChatPage from '../pages/MyChatPage';
import NewPost from '../pages/Post/NewPost';
import CheckPost from '../pages/Post/CheckPost';

const router = createBrowserRouter([
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
]);

export default router;
