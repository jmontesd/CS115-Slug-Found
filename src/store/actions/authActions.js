import { uploadImage } from '../../firebase/firebase';

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
      uploadImage(newUser.imageFile, (id, imageURL) => {
        firestore
          .collection('users')
          .doc(resp.user.uid)
          .set({
            username: newUser.username,
            profilePictureURL: imageURL,
          });
      });
    })
    .then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' });
    })
    .catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err });
    });
};

export const updateProfileImage = (imageFile) => (dispatch, getState, { getFirestore }) => {
  const { uid } = getState().firebase.auth;
  const firestore = getFirestore();
  uploadImage(imageFile, (id, imageURL) => {
    console.log(firestore.collection('users').doc(uid));
    firestore
      .collection('users')
      .doc(uid)
      .update({
        profilePictureURL: imageURL,
      });
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
