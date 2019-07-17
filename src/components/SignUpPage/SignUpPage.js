import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp as signUpAction } from '../../store/actions/authActions';
import './SignUpPage.scss';

export const SignUpPage = (props) => {
  const { signUpError, isLoggedIn, signUp } = props;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');

  if (isLoggedIn) return <Redirect to="/" />;

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImageFile(image);
    }
  };

  const validateForm = () => {
    if (!username) {
      setError('Please enter an username');
      return false;
    }
    if (!email) {
      setError('Please enter an email');
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

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setError('');
      signUp({ username, email, password, imageFile });
    }
  };

  return (
    <div className="auth-wrapper">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
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
        <div className="form-group">
          <div htmlFor="file">Profile Picture</div>
          <label className="btn btn-outline-info cursor-pointer">
            <input className="d-none" type="file" onChange={handleFileChange} />
            Choose File
          </label>
          <span className="ml-2">{imageFile && imageFile.name}</span>
        </div>
        <button type="submit" className="btn btn-primary full-width">
          Sign Up
        </button>
        {error && <div className="mt-2 alert alert-danger">{error}</div>}
        {!error && signUpError && <div className="mt-2 alert alert-danger">{signUpError}</div>}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  signUpError: state.auth.signUpError,
  isLoggedIn: state.firebase.auth.uid,
});

const mapDispatchToProps = (dispatch) => ({
  signUp: (creds) => dispatch(signUpAction(creds)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpPage);
