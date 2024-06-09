importScripts(
  'https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.6.0/firebase-messaging-compat.js',
);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
