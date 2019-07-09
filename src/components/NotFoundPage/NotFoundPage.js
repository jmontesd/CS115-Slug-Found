import React from 'react';
import './NotFoundPage.scss';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const NotFoundPage = (props) => {
  const { isLoggedIn } = props;

  if (!isLoggedIn) return <Redirect to="/login" />;

  return (
    <div className="container">
      <Link to="/">404 - Go home</Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.firebase.auth.uid,
  };
};

export default connect(mapStateToProps)(NotFoundPage);
