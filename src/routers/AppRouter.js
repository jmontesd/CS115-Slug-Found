import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../components/HomePage/HomePage';
import ItemPage from '../components/ItemPage/ItemPage';
import MessagesPage from '../components/MessagesPage/MessagesPage';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import SubmitPage from '../components/SubmitPage/SubmitPage';
// import NavBar from '../components/NavBar/NavBar';

import SideBar from '../components/SideBar/SideBar';
import SignUpPage from '../components/SignUpPage/SignUpPage';
import LogInPage from '../components/LogInPage/LogInPage';

import ResetPage from '../components/ResetPage/ResetPage';
// lets users navigate website
const AppRouter = () => (
  <BrowserRouter>
    <div>
      {/* navbar always shows up */}
      {/* <NavBar /> */}
      <SideBar />
      <Switch>
        {/* depending on path, render that component */}
        <Route path="/" component={HomePage} exact />
        <Route path="/item/:id" component={ItemPage} exact />
        <Route path="/messages" component={MessagesPage} exact />
        <Route path="/profile/:id" component={ProfilePage} exact />
        <Route path="/submit" component={SubmitPage} exact />
        <Route path="/login" component={LogInPage} exact />
        <Route path="/signup" component={SignUpPage} exact />
         
        <Route path="/reset" component={ResetPage} exact />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);
export default AppRouter;
