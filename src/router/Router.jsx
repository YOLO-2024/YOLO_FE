import { createBrowserRouter } from 'react-router-dom';

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
    element: <InterestPage />,
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
        element: <PostPage />,
      },
      {
        path: '/chatroom',
        element: <ChatPage />,
      },
      {
        path: '/myChatroom',
        element: <MyChatPage />,
      },
    ],
  },
  { path: '/post/create', element: <NewPost /> },
  { path: '/post/:postId', element: <CheckPost /> },
  { path: '/post/edit/:postId', element: <EditPost /> },
  { path: '/chatroom/:roomId', element: <EditPost /> },
]);

export default router;
