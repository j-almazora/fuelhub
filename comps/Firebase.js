import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA1_AkfB4vzY7gc-YivpHoKLE7M1bRd9Js",
  authDomain: "fuelhub-8f114.firebaseapp.com",
  databaseURL: "https://fuelhub-8f114.firebaseio.com",
  projectId: "fuelhub-8f114",
  storageBucket: "fuelhub-8f114.appspot.com",
  messagingSenderId: "293752857752"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
