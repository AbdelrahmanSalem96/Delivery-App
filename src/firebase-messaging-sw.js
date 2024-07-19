importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');


firebase.initializeApp({

  apiKey: "AIzaSyBnCIMr08bPnkYx7vXRWBbZHp4RH6UTekM",
  authDomain: "speed-ade6a.firebaseapp.com",
  projectId: "speed-ade6a",
  storageBucket: "speed-ade6a.appspot.com",
  messagingSenderId: "495161564122",
  appId: "1:495161564122:web:e198f641d44fbba5fcbee3",
  measurementId: "G-J1CFYBSYZV"

});

const messaging = firebase.messaging();

// apiKey: "AIzaSyAHmPVKFxFOhREYAMMcuYQqSYVs0YVOqyo",
// authDomain: "speed-deliver-app.firebaseapp.com",
// databaseURL: "https://speed-deliver-app-default-rtdb.firebaseio.com",
// projectId: "speed-deliver-app",
// storageBucket: "speed-deliver-app.appspot.com",
// messagingSenderId: "815530528757",
// appId: "1:815530528757:web:35f93589e8212ecfd89abc",
// measurementId: "G-XCN8KSN20C"



// messaging.onBackgroundMessage(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.icon
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
