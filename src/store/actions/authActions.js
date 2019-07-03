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
    .then((resp) =>
      firestore
        .collection('users')
        .doc(resp.user.uid)
        .set({
          username: newUser.username,
        }),
    )
    .then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' });
    })
    .catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err });
    });
};
