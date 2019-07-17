import { uploadImage } from '../../firebase/firebase';
// action for logIn
export const logIn = (credentials) => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  // logs in the user
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
// action for signOut
export const signOut = () => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  // signs out the user
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
// action for signUp
export const signUp = (newUser) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  // signs up the user
  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((resp) => {
      // uploads the image
      uploadImage(newUser.imageFile, (id, imageURL) => {
        // sets the profile image to the user
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

// updates user profile image
export const updateProfileImage = (imageFile) => (dispatch, getState, { getFirestore }) => {
  // gets which user is currently logged in
  const { uid } = getState().firebase.auth;
  const firestore = getFirestore();
  // uploads the image
  uploadImage(imageFile, (id, imageURL) => {
    // updates the imageUrl to the new profile picture
    firestore
      .collection('users')
      .doc(uid)
      .update({
        profilePictureURL: imageURL,
      });
  });
};

// resets the password
export const resetPassword = (email) => (dispatch, getState, { getFirebase }) => {
  // tells firebase to reset the password
  getFirebase()
    .resetPassword(email)
    .then(() => {
      dispatch({ type: 'RESET_PASSWORD_SUCCESS' });
    })
    .catch((err) => {
      dispatch({ type: 'RESET_PASSWORD_ERROR', err });
    });
};
