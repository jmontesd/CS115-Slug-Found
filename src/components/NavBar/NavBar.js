import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import { connect } from 'react-redux';
import { signOut as actionSignOut } from '../../store/actions/authActions';

const NavBar = (props) => {
  const { isSignedIn, signOut } = props;

  const renderLogInSignUpButtons = (
    <div className="d-flex flex-row">
      <Link to="/login" className="btn btn-outline-primary mr-2">
        Log In
      </Link>
      <Link to="/signup" className="btn btn-primary">
        Sign Up
      </Link>
    </div>
  );

  const renderSignOutButton = (
    <div className="d-flex flex-row">
      <Link className="btn btn btn-outline-primary" to="/" onClick={signOut}>
        Sign Out
      </Link>
    </div>
  );

  return (
    <nav className="navbar navbar-light bg-light mb-2">
      <div className="container d-flex justify-content-between">
        <Link className="navbar-brand" to="/">
          {'Slug&Found'}
        </Link>
        {isSignedIn ? renderSignOutButton : renderLogInSignUpButtons}
      </div>
    </nav>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(actionSignOut()),
});
const mapStateToProps = (state) => ({
  isSignedIn: state.firebase.auth.uid,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
