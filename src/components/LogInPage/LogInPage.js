import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { logIn as logInAction } from '../../store/actions/authActions';
import './LogInPage.scss';

export const LogInPage = (props) => {
  const { authError, isSignedIn, signIn } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isSignedIn) return <Redirect to="/" />;

  const validateForm = () => {
    if (!email) {
      setError('Please enter an email');
      return false;
    }
    if (!password) {
      setError('Please enter a password');
      return false;
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setError('');
      signIn({ email, password });
    }
  };

  return (
    <div className="auth-wrapper">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
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
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link className="mb-2 d-block" to="/reset">
          Reset Password
        </Link>
        <button type="submit" className="btn btn-primary full-width">
          Sign In
        </button>
        {error && <div className="mt-2 alert alert-danger">{error}</div>}
        {!error && authError && <div className="mt-2 alert alert-danger">{authError}</div>}
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
