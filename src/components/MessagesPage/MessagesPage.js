import React from 'react';
import './MessagesPage.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const MessagesPage = (props) => {
  const { isLoggedIn } = props;

  if (!isLoggedIn) return <Redirect to="/login" />;

  return <div className="container">MessagesPage</div>;
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.firebase.auth.uid,
  };
};

export default connect(mapStateToProps)(MessagesPage);
