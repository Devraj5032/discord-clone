import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB-HAUlp66OY3iyIK6yYg-uklG3eL4ARGU",
    authDomain: "discord-d0849.firebaseapp.com",
    projectId: "discord-d0849",
    storageBucket: "discord-d0849.appspot.com",
    messagingSenderId: "481050445728",
    appId: "1:481050445728:web:84ea511968c7b6561146c5"
  };

const app = firebase.initializeApp(firebaseConfig)

const db = app.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth , provider , db}