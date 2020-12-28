import firebase from 'firebase/app'
import 'firebase/messaging'


var firebaseConfig = {
    apiKey: "AIzaSyDCdTq8rTZiz3AJURPv2IOtWVqpPAx0MEo",
    authDomain: "ewha-farm.firebaseapp.com",
    projectId: "ewha-farm",
    storageBucket: "ewha-farm.appspot.com",
    messagingSenderId: "807655548321",
    appId: "1:807655548321:web:fa1780e8b5000d4023d7e0",
    measurementId: "G-53W79RTRFP"
};

firebase.initializeApp(firebaseConfig);

var myToken = '';
const messaging = firebase.messaging();
messaging.usePublicVapidKey('BHpBXs42V6czZdZvuvOxcbb4vPiQFhbv0A43zRU1I7FiFUSOOmLfBA0vilF8EKainR9FYJ1A1iWsmb_1Gx_wvTY');

Notification.requestPermission()
        .then((permission) => {
          console.log('permission ', permission)
          if (permission !== 'granted') {
            alert('알림을 허용해주세요')
          }
        })

messaging.getToken().then((currentToken) => {
    if (currentToken) {
        console.log(currentToken);
        myToken = currentToken;
    } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
    }
});
messaging.onMessage((payload) => {
    console.log(payload);
    alert(payload.notification.body)
    
    const title = 'Title';
    const options = {
        body: payload.notification.body,
        icon: '/firebase-logo.png',
    };
    const notification = new Notification(title, options);
    return notification;
});

export {
    myToken,
};