/* eslint-disable import/prefer-default-export */
/* eslint-disable no-alert */
import { ref } from '@vue/composition-api'
import firebase from 'firebase/app'
import 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyDCdTq8rTZiz3AJURPv2IOtWVqpPAx0MEo',
  authDomain: 'ewha-farm.firebaseapp.com',
  projectId: 'ewha-farm',
  storageBucket: 'ewha-farm.appspot.com',
  messagingSenderId: '807655548321',
  appId: '1:807655548321:web:fa1780e8b5000d4023d7e0',
  measurementId: 'G-53W79RTRFP',
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()
messaging.usePublicVapidKey('BHpBXs42V6czZdZvuvOxcbb4vPiQFhbv0A43zRU1I7FiFUSOOmLfBA0vilF8EKainR9FYJ1A1iWsmb_1Gx_wvTY')

Notification.requestPermission().then(permission => {
  if (permission !== 'granted') {
    alert('알림을 허용해주세요')
  }
})

const token = ref('')
messaging.getToken().then(currentToken => {
  if (currentToken) {
    token.value = currentToken
  } else {
    console.log('No Instance ID token available. Request permission to generate one.')
  }
})

messaging.onMessage(payload => {
  console.log(payload)

  const title = 'Title'
  const options = {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
  }
  const notification = new Notification(title, options)
  return notification
})

export {
  token,
  messaging,
}
