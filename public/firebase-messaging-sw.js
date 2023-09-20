// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging.js');

importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js')

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyByfsM9FLkdLfMBZNG6wAP-Yh2eCx5Z3wM',
  authDomain: 'push-notification-test-56691.firebaseapp.com',
  projectId: 'push-notification-test-56691',
  storageBucket: 'push-notification-test-56691.appspot.com',
  messagingSenderId: '1098719346038',
  appId: '1:1098719346038:web:e105aa6785801d8c194e57',
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

console.log({ firebase, messaging })

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
})
