import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore, firestoreReducer } from 'redux-firestore';
import { reactReduxFirebase, getFirebase, firebaseReducer } from 'react-redux-firebase';
import fbConfig from '../firebase/firebase';
import authReducer from './reducers/authReducer';

export default () => {
  // creates store to any component can access date from authReducer, firestoreReducer,
  // or firebaseReducer
  const store = createStore(
    combineReducers({
      auth: authReducer,
      firestore: firestoreReducer,
      firebase: firebaseReducer,
    }),
    // compose allows us to use multiple enhancers
    compose(
      applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
      // reactReduxFirebase to our firebase config
      reactReduxFirebase(fbConfig, {
        userProfile: 'users',
        useFirestoreForProfile: true,
        attachAuthIsReady: true,
      }),
      // connects reduxFirestore to our firebase config
      reduxFirestore(fbConfig),
    ),
  );
  return store;
};
