import { RouterProvider } from 'react-router-dom';
import router from './router/Router';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {

  const queryClient = new QueryClient();
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  useEffect(() => {
    setScreenSize();
  });
  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
