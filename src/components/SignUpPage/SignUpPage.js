import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { signUp as signUpAction } from '../../store/actions/authActions';
import './SignUpPage.scss';
import logo from '../logo.jpeg';

export const SignUpPage = (props) => {
  // these are the props need for this component
  const { signUpError, isLoggedIn, signUp } = props;
  // vars needed for this component
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  // redirect user to home page if they are already logged in
  if (isLoggedIn) return <Redirect to="/" />;
  // this is used to handle when user uploads image
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImageFile(image);
    }
  };
  // make sure user submitted valid data
  const validateForm = () => {
    if (!username) {
      setError('Please enter an username');
      return false;
    }
    if (!email) {
      setError('Please enter an email');
      return false;
    }
    if (!email.includes('ucsc.edu')) {
      setError('Please use your UCSC email');
      return false;
    }
    if (!password) {
      setError('Please enter a password');
      return false;
    }
    if (!imageFile) {
      setError('Please enter an image');
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
      // sign the user up
      signUp({ username, email, password, imageFile });
    }
  };
  // render this to the screen
  return (
    <div className="auth-wrapper">
       <img src={logo} alt="Logo" id="logo" />
      {/* onSubmit is called when form submitted */}
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          value={username}
          // set the username var if user changes
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <div htmlFor="file">Profile Picture</div>
        <label className="btn btn-outline-info cursor-pointer">
          <input className="d-none" type="file" onChange={handleFileChange} />
          Choose File
        </label>
        {/* if there is an imageFile, render the name to screen */}
        <span>{imageFile && imageFile.name}</span>
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/login">Log in instead</Link>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        {/* if there is an error, render it to the screen */}
        {error && <div className="mt-2 alert alert-danger">{error}</div>}
        {/* if firebase says there is an error, render that to the screen only if
        there already isn't an error on the screen */}
        {!error && signUpError && <div className="mt-2 alert alert-danger">{signUpError}</div>}
      </form>
    </div>
  );
};
// check to see if user is logged in
// and check if firebase gave an error when signing up
// and pass them as props to the component
const mapStateToProps = (state) => ({
  signUpError: state.auth.signUpError,
  isLoggedIn: state.firebase.auth.uid,
});
// get the signUp function which will sign up the user and send
// info to firebase
const mapDispatchToProps = (dispatch) => ({
  signUp: (creds) => dispatch(signUpAction(creds)),
});
// export this component with the neccessary data
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpPage);
