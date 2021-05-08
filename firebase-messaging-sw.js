
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAtswYIJZhDhDz_urYWm6H8UkhxTpQ5c70",
    authDomain: "chatapp-d8fe4.firebaseapp.com",
    databaseUrl: "https://chatapp-d8fe4-default-rtdb.firebaseio.com/",
    projectId: "chatapp-d8fe4",
    storageBucket: "chatapp-d8fe4.appspot.com",
    messagingSenderId: "799414766327",
    appId: "1:799414766327:web:fdf1a5d002f951554d61f2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        icon: payload.data.icon,
        body: payload.data.message,         
    };
    
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});






