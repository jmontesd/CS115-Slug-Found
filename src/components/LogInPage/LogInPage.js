import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { logIn as logInAction } from '../../store/actions/authActions';
import './LogInPage.scss';
import logo from '../logo.jpeg';

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
    <div>
    <div className="auth-wrapper">
      <img src={logo} alt="Logo" id="logo" />
      {/* onSubmit is called when form submitted */}
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          value={email}
          // set the email var if user changes
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          // set the password var if user changes
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link className="d-block" to="/reset">
          Reset Password
        </Link>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            {`Don't have an account? `}
            <Link to="/signup">Sign Up</Link>
          </div>
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </div>
        {/* if there is an error, render it to the screen */}
        {error && <div className="mt-2 alert alert-danger">{error}</div>}
        {/* if firebase says there is an error, render that to the screen only if
        there already isn't an error on the screen */}
        {!error && loginError && <div className="mt-2 alert alert-danger">{loginError}</div>}
      </form>
    </div>
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
