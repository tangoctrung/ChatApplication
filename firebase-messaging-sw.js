// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js');

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


// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'You have new message';
    const notificationOptions = {
        body: payload.data.message,
        icon: payload.data.icon
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});



