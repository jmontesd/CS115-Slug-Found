import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';

const store = configureStore();
const App = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(App, document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
