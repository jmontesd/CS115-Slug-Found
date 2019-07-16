import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { resetPassword as resetPasswordAction } from '../../store/actions/authActions';
import './ResetPage.scss';

export const ResetPage = (props) => {
  const { authError, isLoggedIn, resetPassword, resetPasswordSuccessMessage } = props;
  const [email, setEmail] = useState('');
  const [error, setError] = useState();

  if (isLoggedIn) return <Redirect to="/" />;

  const validateEmail = () => {
    if (!email) {
      setError('Please enter email');
      return false;
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      setError('');
      resetPassword({ email });
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
        <button type="submit" className="btn btn-primary full-width">
          Sign Up
        </button>
        {error && <div className="mt-2 alert alert-danger">{error}</div>}
        {!error && authError && <div className="mt-2 alert alert-danger">{authError}</div>}
        {resetPasswordSuccessMessage && (
          <div className="mt-2 alert alert-success">{resetPasswordSuccessMessage}</div>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authError: state.auth.authError,
  isLoggedIn: state.firebase.auth.uid,
  resetPasswordSuccessMessage: state.auth.resetPasswordSuccessMessage,
});

const mapDispatchToProps = (dispatch) => ({
  resetPassword: (creds) => dispatch(resetPasswordAction(creds)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPage);
