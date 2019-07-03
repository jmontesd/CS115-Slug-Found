import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp as signUpAction } from '../../store/actions/authActions';
import './SignUpPage.scss';

export const SignUpPage = (props) => {
  const { authError, darkMode, isSignedIn, signUp } = props;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  if (isSignedIn) return <Redirect to="/" />;
  const renderAuthError = <div className="mt-2 alert alert-danger">{authError}</div>;
  const onSubmit = (e) => {
    e.preventDefault();
    signUp({ username, email, password });
  };
  const inputClassName = `form-control${darkMode ? ' bg-dark text-white' : ''}`;
  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className={inputClassName}
            id="username"
            aria-describedby="usernameHelp"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className={inputClassName}
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className={inputClassName}
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
        {authError && renderAuthError}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authError: state.auth.authError,
  isSignedIn: state.firebase.auth.uid,
});

const mapDispatchToProps = (dispatch) => ({
  signUp: (creds) => dispatch(signUpAction(creds)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpPage);
