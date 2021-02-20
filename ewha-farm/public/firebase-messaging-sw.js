/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js')

// const { firebaseConfig } = require('../firebaseConfig')
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
  console.log('Background Message received. ', payload)

  const push = payload.data
  const { title } = push
  const options = {
    body: push.subtitle,
    icon: '/firebase-logo.png',
  }

  return registration.showNotification(title, options)
})
