// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import type { Messaging, NotificationPayload } from 'firebase/messaging'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyByfsM9FLkdLfMBZNG6wAP-Yh2eCx5Z3wM',
  authDomain: 'push-notification-test-56691.firebaseapp.com',
  projectId: 'push-notification-test-56691',
  storageBucket: 'push-notification-test-56691.appspot.com',
  messagingSenderId: '1098719346038',
  appId: '1:1098719346038:web:e105aa6785801d8c194e57',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Cloud Messaging and get a reference to the service
let messaging: Messaging
if (typeof window !== 'undefined' && window.navigator) {
  messaging = getMessaging(app)
}

let count = 0

export const getFcmToken = async (): Promise<string | null> => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: 'BHYC0xw1TyoYMoFFWMRBMzf7ZonN6c-cye5oanQXjdEzZ9BagZzLEb7s9HwLQBocL3UyK7jGe3P4rRJY9mScHN4',
    })
    if (currentToken) {
      console.log(currentToken)
      return currentToken
    } else {
      console.log('No registration token available. Request permission to generate one.')
      return null
    }
  } catch (error) {
    console.log(error)
    if (++count > 5) {
      return null
    }
    return new Promise((resolve) => {
      window.setTimeout(() => {
        console.log('Reentry:', count)
        resolve(getFcmToken())
      }, 500)
    })
  }
}

export const onMessageByFCM = (callback?: (notification: NotificationPayload | null) => void) => {
  console.log('onMessage')
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload)
    callback?.(payload.notification ?? null)
  })
}
