import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

// Add your Firebase credentials
const firebaseConfig = {
  apiKey: "AIzaSyA-DUTh4k4sSdeHJxp4uoLa9yDTgoAFFHY",
  authDomain: "https://www.googleapis.com/oauth2/v1/certs",
  projectId: "calculator-c8c28",
  storageBucket: "calculator-c8c28.appspot.com",
  messagingSenderId: "36982791167",
  appId: "1:36982791167:android:912faf36a2e5ab726325ca"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase, firestore };