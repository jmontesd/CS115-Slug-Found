import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore, firestoreReducer } from 'redux-firestore';
import { reactReduxFirebase, getFirebase, firebaseReducer } from 'react-redux-firebase';
import fbConfig from '../firebase/firebase';
import authReducer from './reducers/authReducer';

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      firestore: firestoreReducer,
      firebase: firebaseReducer,
    }),
    compose(
      applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
      reactReduxFirebase(fbConfig, {
        userProfile: 'users',
        useFirestoreForProfile: true,
        attachAuthIsReady: true,
      }),
      reduxFirestore(fbConfig),
    ),
  );
  return store;
};
