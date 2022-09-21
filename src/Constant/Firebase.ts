// import firebase from '@react-native-firebase/app'

// const firebaseConfig = {
//     apiKey: "AIzaSyA_VLyOKElxhwK3LhnfnfAc-RzCwwkFZA8",
//     authDomain: "ts-reactnative-fec8b.firebaseapp.com",
//     projectId: "ts-reactnative-fec8b",
//     storageBucket: "ts-reactnative-fec8b.appspot.com",
//     messagingSenderId: "505483753338",
//     appId: "1:505483753338:web:7844ee54cf21ce6ac508c3",
//     measurementId: "G-EC3ZP3TZ9G"
//   };

//  export const db = firebase.initializeApp(firebaseConfig)

 import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration

const firebaseConfig = {
  apiKey: "AIzaSyA_VLyOKElxhwK3LhnfnfAc-RzCwwkFZA8",
    authDomain: "ts-reactnative-fec8b.firebaseapp.com",
    projectId: "ts-reactnative-fec8b",
    storageBucket: "ts-reactnative-fec8b.appspot.com",
    messagingSenderId: "505483753338",
    appId: "1:505483753338:web:7844ee54cf21ce6ac508c3",
    measurementId: "G-EC3ZP3TZ9G"
};

export const app = initializeApp(firebaseConfig);
// MARK: Firestore Reference
export const db = getFirestore(app);