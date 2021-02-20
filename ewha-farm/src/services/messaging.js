/* eslint-disable import/prefer-default-export */
/* eslint-disable no-alert */
import { ref } from '@vue/composition-api'
import { firebaseConfig } from '@firebaseConfig'
import firebase from 'firebase/app'
import 'firebase/messaging'

firebase.initializeApp(firebaseConfig)

// eslint-disable-next-line import/no-mutable-exports
let messaging = null
const deviceToken = ref('')

if (firebase.messaging.isSupported()) {
  console.log('this browser is supported firebase')

  messaging = firebase.messaging()
  messaging.usePublicVapidKey('BHpBXs42V6czZdZvuvOxcbb4vPiQFhbv0A43zRU1I7FiFUSOOmLfBA0vilF8EKainR9FYJ1A1iWsmb_1Gx_wvTY')

  Notification.requestPermission().then(permission => {
    if (permission !== 'granted') {
      alert('알림을 허용해주세요')
    }
  }).catch(err => {
    console.log(err)
  })

  messaging.getToken().then(currentToken => {
    if (currentToken) {
      deviceToken.value = currentToken
    } else {
      console.log('No Instance ID token available. Request permission to generate one.')
    }
  }).catch(err => {
    console.log(err)
  })
} else {
  console.log('this browser is not supported firebase')
}

export {
  deviceToken,
  messaging,
}
