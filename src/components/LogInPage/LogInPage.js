import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { logIn as logInAction } from '../../store/actions/authActions';
import './LogInPage.scss';

export const LogInPage = (props) => {
  // these are the props need for this component
  const { loginError, isLoggedIn, logIn } = props;
  // vars needed for this component
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // redirect user to home page if they are already logged in
  if (isLoggedIn) return <Redirect to="/" />;
  // make sure user submitted valid data
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
  // when user hits submmit
  const onSubmit = (e) => {
    // prevent the page from reloading
    e.preventDefault();
    // only submits if user submits valid data
    if (validateForm()) {
      setError('');
      // log in user
      logIn({ email, password });
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
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            // set the password var if user changes
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link className="mb-2 d-block" to="/reset">
          Reset Password
        </Link>
        <button type="submit" className="btn btn-primary full-width">
          Sign In
        </button>
        {/* if there is an error, render it to the screen */}
        {error && <div className="mt-2 alert alert-danger">{error}</div>}
        {/* if firebase says there is an error, render that to the screen only if
        there already isn't an error on the screen */}
        {!error && loginError && <div className="mt-2 alert alert-danger">{loginError}</div>}
      </form>
    </div>
  );
};
// check to see if user is logged in
// and check if firebase gave an error when logging in
// and pass them as props to the component
const mapStateToProps = (state) => ({
  loginError: state.auth.loginError,
  isLoggedIn: state.firebase.auth.uid,
});
// get the logIn function which will sign up the user and send
// info to firebase
const mapDispatchToProps = (dispatch) => ({
  logIn: (creds) => dispatch(logInAction(creds)),
});
// export this component with the neccessary data
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogInPage);
