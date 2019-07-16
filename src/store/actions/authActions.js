import uuid from 'uuid';
import { storage } from '../../firebase/firebase';

export const logIn = (credentials) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    })
    .catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
};

export const signOut = () => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();

  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' });
    })
    .catch((err) => {
      dispatch({ type: 'SIGNOUT_ERROR', err });
    });
};

export const signUp = (newUser) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((resp) => {
      const id = uuid();
      const uploadTask = storage.ref(`images/${id}`).put(newUser.imageFile);

      uploadTask.on(
        'state_changed',
        () => {
          // progrss function ....
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
              firestore
                .collection('users')
                .doc(resp.user.uid)
                .set({
                  username: newUser.username,
                  profilePictureURL: imageURL,
                });
            });
        },
      );
    })
    .then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' });
    })
    .catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err });
    });
};

export const resetPassword = ({ email }) => (dispatch, getState, { getFirebase }) => {
  getFirebase()
    .resetPassword(email)
    .then(() => {
      dispatch({ type: 'RESET_PASSWORD_SUCCESS' });
    })
    .catch(() => {});
};
