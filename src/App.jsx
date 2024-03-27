import { RouterProvider } from 'react-router-dom';
import router from './router/Router';
import { useEffect } from 'react';

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
