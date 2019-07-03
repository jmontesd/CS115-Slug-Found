import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyBpgMy_ZQuMpxqMW10gZA9cY-tipfmNljo',
  authDomain: 'slug-and-found.firebaseapp.com',
  databaseURL: 'https://slug-and-found.firebaseio.com',
  projectId: 'slug-and-found',
  storageBucket: 'slug-and-found.appspot.com',
  messagingSenderId: '315440274007',
};

firebase.initializeApp(firebaseConfig);
export default firebase;
