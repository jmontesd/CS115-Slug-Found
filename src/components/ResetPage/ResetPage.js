import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { resetPassword as resetPasswordAction } from '../../store/actions/authActions';
import './ResetPage.scss';

export const ResetPage = (props) => {
  // these are the props need for this component
  const { resetPasswordError, isLoggedIn, resetPassword, resetPasswordSuccessMessage } = props;
  // vars needed for this component
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  // redirect user to home page if they are already logged in
  if (isLoggedIn) return <Redirect to="/" />;
  // make sure user submitted valid email
  const validateEmail = () => {
    if (!email) {
      setError('Please enter email');
      return false;
    }
    return true;
  };
  // when user hits submmit
  const onSubmit = (e) => {
    // prevent the page from reloading
    e.preventDefault();
    // only submits if user submits valid data
    if (validateEmail()) {
      setError('');
      // reset password for that email
      resetPassword(email);
    }
  };
  // render this to the screen
  return (
    <div className="auth-wrapper">
      {/* onSubmit is called when form submitted */}
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
            // set the email var if user changes
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary full-width">
          Reset Password
        </button>
        {/* if there is an error, render it to the screen */}
        {error && <div className="mt-2 alert alert-danger">{error}</div>}
        {/* if firebase says there is an error, render that to the screen only if
        there already isn't an error on the screen */}
        {!error && resetPasswordError && (
          <div className="mt-2 alert alert-danger">{resetPasswordError}</div>
        )}
        {/* if reseting password was a success, then show success message */}
        {resetPasswordSuccessMessage && (
          <div className="mt-2 alert alert-success">{resetPasswordSuccessMessage}</div>
        )}
      </form>
    </div>
  );
};
// check to see if user is logged in
// and check if firebase gave an error when reseting password
// and check if reseting password was a success
// and pass them as props to the component
const mapStateToProps = (state) => ({
  resetPasswordError: state.auth.resetPasswordError,
  isLoggedIn: state.firebase.auth.uid,
  resetPasswordSuccessMessage: state.auth.resetPasswordSuccessMessage,
});
// get the logIn function which will sign up the user and send
// info to firebase
const mapDispatchToProps = (dispatch) => ({
  resetPassword: (email) => dispatch(resetPasswordAction(email)),
});
// export this component with the neccessary data
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPage);
