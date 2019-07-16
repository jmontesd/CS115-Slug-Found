import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';
import uuid from 'uuid';

const firebaseConfig = {
  apiKey: 'AIzaSyBpgMy_ZQuMpxqMW10gZA9cY-tipfmNljo',
  authDomain: 'slug-and-found.firebaseapp.com',
  databaseURL: 'https://slug-and-found.firebaseio.com',
  projectId: 'slug-and-found',
  storageBucket: 'slug-and-found.appspot.com',
  messagingSenderId: '315440274007',
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

const uploadImage = (imageFile, callBack) => {
  const id = uuid();

  storage
    .ref(`images/${id}`)
    .put(imageFile)
    .on(
      'state_changed',
      () => {
        // progress function ....
      },
      () => {
        // error function ....
      },
      () => {
        // complete function ....
        storage
          .ref('images')
          .child(id)
          .getDownloadURL()
          .then((imageURL) => {
            callBack(id, imageURL);
          });
      },
    );
};

export { uploadImage, storage, firebase as default };
