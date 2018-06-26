import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Initialize Firebase
const config = {
  apiKey: 'apiKey',
  authDomain: 'authDomain',
  databaseURL: 'databaseURL',
  projectId: 'projectId',
  storageBucket: 'storageBucket',
  messagingSenderId: 'messagingSenderId'
}
firebase.initializeApp(config)
