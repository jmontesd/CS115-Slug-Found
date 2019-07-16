import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp as signUpAction } from '../../store/actions/authActions';
import './SignUpPage.scss';

export const SignUpPage = (props) => {
  const { authError, darkMode, isLoggedIn, signUp } = props;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState();

  if (isLoggedIn) return <Redirect to="/" />;

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImageFile(image);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      setError('Please enter an username');
      return;
    }
    if (!email) {
      setError('Please enter an email');
      return;
    }
    if (!password) {
      setError('Please enter a password');
      return;
    }
    if (!imageFile) {
      setError('Please enter an image');
      return;
    }
    setError('');

    signUp({ username, email, password, imageFile });
  };

  const inputClassName = `form-control${darkMode ? ' bg-dark text-white' : ''}`;

  return (
    <div className="auth-wrapper">
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
        <div className="form-group">
          <label htmlFor="file">Profile Picture</label>
          <div>
            <input to="file" type="file" onChange={handleChange} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary full-width">
          Sign Up
        </button>
        {error && <div className="mt-2 alert alert-danger">{error}</div>}
        {authError && <div className="mt-2 alert alert-danger">{authError}</div>}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authError: state.auth.authError,
  isLoggedIn: state.firebase.auth.uid,
});

const mapDispatchToProps = (dispatch) => ({
  signUp: (creds) => dispatch(signUpAction(creds)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpPage);
