importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCSzz29m-EYW-xcWO23pGX8Vv24Npg8c1Q",
  authDomain: "yolo-417813.firebaseapp.com",
  projectId: "yolo-417813",
  storageBucket: "yolo-417813.appspot.com",
  messagingSenderId: "1047449344904",
  appId: "1:1047449344904:web:1ec4b1787652bf8c51783d",
  measurementId: "G-3T5Z123BJM",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
