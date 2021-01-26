import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyCCoKnhpwqTIPUd6qfhN2Tsct34Fiv6PyI",
    authDomain: "cs115-4b981.firebaseapp.com",
    databaseURL: "https://cs115-4b981.firebaseio.com",
    projectId: "cs115-4b981",
    storageBucket: "cs115-4b981.appspot.com",
    messagingSenderId: "800628161148",
    appId: "1:800628161148:web:d440f3a829697818"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}