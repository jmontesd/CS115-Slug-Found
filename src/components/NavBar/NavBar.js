import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import { connect } from 'react-redux';
import { signOut as actionSignOut } from '../../store/actions/authActions';

export const NavBar = (props) => {
  // these are the props need for this component
  const { isLoggedIn, signOut } = props;
  // holds html for log in and sign up buttons
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
  // holds html for messages, submit, and signout buttons
  const renderMessagesSubmitSignOutButton = (
    <div className="d-flex flex-row">
      <Link to="/messages" className="btn btn-outline-primary mr-2">
        Messages
      </Link>
      <Link to="/submit" className="btn btn-outline-primary mr-2">
        Submit
      </Link>
      <Link className="btn btn-primary" to="/" onClick={signOut}>
        Sign Out
      </Link>
    </div>
  );
  // render this to the screen
  return (
    <nav className="navbar navbar-light bg-light mb-2">
      <div className="container d-flex justify-content-between">
        <Link className="navbar-brand" to="/">
          {'Slug&Found'}
        </Link>
        {/* render depending if the user is logged in or not */}
        {isLoggedIn ? renderMessagesSubmitSignOutButton : renderLogInSignUpButtons}
      </div>
    </nav>
  );
};
// check to see if user is logged in
// and pass that as a prop to the component
const mapStateToProps = (state) => ({
  isLoggedIn: state.firebase.auth.uid,
});
// get the signout function to sign user out from firebase
const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(actionSignOut()),
});
// export this component with the neccessary data
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
