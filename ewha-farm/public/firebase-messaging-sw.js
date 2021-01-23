/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js')

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDCdTq8rTZiz3AJURPv2IOtWVqpPAx0MEo',
  authDomain: 'ewha-farm.firebaseapp.com',
  projectId: 'ewha-farm',
  storageBucket: 'ewha-farm.appspot.com',
  messagingSenderId: '807655548321',
  appId: '1:807655548321:web:fa1780e8b5000d4023d7e0',
  measurementId: 'G-53W79RTRFP',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

// 백그라운드 상태에서 받은 알림 처리
messaging.setBackgroundMessageHandler(payload => {
  console.log('Message received. ', payload)
  // Customize notification here
  const title = 'Background Message Title'
  const options = {
    body: payload.data.message,
    icon: '/firebase-logo.png',
  }

  return registration.showNotification(title, options)
})
