// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBcviO7z47LDehBRoO92y72Bir4RjKOpkg",
  authDomain: "jobie-f23ef.firebaseapp.com",
  projectId: "jobie-f23ef",
  storageBucket: "jobie-f23ef.appspot.com",
  messagingSenderId: "885435563478",
  appId: "1:885435563478:web:8a46be1d7afdcd0d953877"
};
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// export const registerServiceWorker = () => {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker
//       .register('firebase-messaging-sw.js')
//       .then(function (registration) {
//         return registration.scope;
//       })
//       .catch(function (err) {
//         return err;
//       });
//   }
// }
// if ('serviceWorker' in navigator) {

  navigator.serviceWorker.register('../public/firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });


messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    // icon: '/firebase-logo.png'
  };
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', event => {
  console.log(event)
  return event;
});

// messaging.onBackgroundMessage(function(payload) {
//   console.log('Received background message ', payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// })
