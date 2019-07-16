import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logIn as logInAction } from '../../store/actions/authActions';
import './LogInPage.scss';

export const LogInPage = (props) => {
  const { authError, darkMode, isSignedIn, signIn } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isSignedIn) return <Redirect to="/" />;

  const onSubmit = (e) => {
    e.preventDefault();
    signIn({ email, password });
  };

  const inputClassName = `form-control${darkMode ? ' bg-dark text-white' : ''}`;

  return (
    <div className="auth-wrapper">
      <form onSubmit={onSubmit}>
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
        <button type="submit" className="btn btn-primary full-width">
          Sign In
        </button>
        {authError && <div className="mt-2 alert alert-danger">{authError}</div>}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authError: state.auth.authError,
  isSignedIn: state.firebase.auth.uid,
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (creds) => dispatch(logInAction(creds)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogInPage);
