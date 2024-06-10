import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("ServiceWorker registration failed: ", error);
        });
    });
  }
  useEffect(() => {
    setScreenSize();
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} basename="https://yolo2024.site"/>
      </QueryClientProvider>
    </>
  );
}

export default App;
