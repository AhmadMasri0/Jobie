
// import { initializeApp } from 'firebase/app';
// import {
//    getMessaging,
//     getToken, onMessage } from "firebase/messaging";
// import '@firebase/messaging';

// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js";
// import { getMessaging } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyBcviO7z47LDehBRoO92y72Bir4RjKOpkg",
  authDomain: "jobie-f23ef.firebaseapp.com",
  projectId: "jobie-f23ef",
  storageBucket: "jobie-f23ef.appspot.com",
  messagingSenderId: "885435563478",
  appId: "1:885435563478:web:8a46be1d7afdcd0d953877"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
const messaging = getMessaging(firebase);

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export const getToken1 = (setTokenFound) => {
  return getToken(messaging, { vapidKey: 'BC2PSh7FtoV3n4oJXnF8dUuZZn8QLMLCSGiQALdEG6izsNG3p5Rb-gAI8_glcJFeYMaDfsF--JZlzIe3XV7LQxo' })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
}


// export const requestFirebaseNotificationPermission = () =>
//   new Promise((resolve, reject) => {
//     messaging
//       .requestPermission()
//       .then(() => messaging.getToken())
//       .then((firebaseToken) => {
//         resolve(firebaseToken);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// export default firebase

// import firebase from 'firebase/compat/app';
// import 'firebase/compat/messaging';

// const firebaseConfig = {
//   apiKey: "AIzaSyBcviO7z47LDehBRoO92y72Bir4RjKOpkg",
//   authDomain: "jobie-f23ef.firebaseapp.com",
//   projectId: "jobie-f23ef",
//   storageBucket: "jobie-f23ef.appspot.com",
//   messagingSenderId: "885435563478",
//   appId: "1:885435563478:web:8a46be1d7afdcd0d953877"
// };

// firebase.initializeApp(firebaseConfig);

// export default firebase;