import React from 'react';
import './SideBar.scss';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { signOut as actionSignOut } from '../../store/actions/authActions';

export class SideBar extends React.Component {
  // get a reference to the element after the component has mounted
  componentDidMount() {
    M.Sidenav.init(this.sidenav);
    M.Collapsible.init(this.collapsible);
  }

  render() {
    const { isLoggedIn, signOut, username, profilePictureURL } = this.props;

    return (
      // adds toggle button to hide sidebar
      <div className={`container section${isLoggedIn ? '' : ' d-none'}`}>
        <a href="toggleBtn" className="sidenav-trigger" data-target="menu-side">
          <i className="material-icons">menu</i>
        </a>
        {/* // adds javascript components in order for the toggle button to work when clicked */}
        <ul
          className="sidenav"
          id="menu-side"
          ref={(sidenav) => {
            this.sidenav = sidenav;
          }}
        >
          <li>
            <div className="user-view">
              <div className="background" />
              {/* // Showcases user profile picture */}
              <Link
                to={`/profile/${isLoggedIn}`}
                onClick={() => M.Sidenav.getInstance(this.sidenav).close()}
              >
                <img alt="" src={profilePictureURL} className="circle" />
              </Link>
              {/* // Showcases username */}
              <Link
                to={`/profile/${isLoggedIn}`}
                onClick={() => M.Sidenav.getInstance(this.sidenav).close()}
              >
                {/* <span class="name white"> Jacqueline Montes</span> */}
                <span className="center-align name white">{username}</span>
                <p />
              </Link>
            </div>
            <div className="div" />
          </li>
          <li>
            <Link to="/" onClick={() => M.Sidenav.getInstance(this.sidenav).close()}>
              <i className="material-icons">home</i>HomePage
            </Link>
          </li>
          <li>
            <Link
              to={`/profile/${isLoggedIn}`}
              onClick={() => M.Sidenav.getInstance(this.sidenav).close()}
            >
              <i className="material-icons">person</i>My Profile
            </Link>
          </li>
          <li>
            <Link to="/messages" onClick={() => M.Sidenav.getInstance(this.sidenav).close()}>
              <i className="material-icons">messages</i>My Messages
            </Link>
          </li>
          <li>
            <Link to="/submit" onClick={() => M.Sidenav.getInstance(this.sidenav).close()}>
              <i className="material-icons">sort</i>New Post
            </Link>
          </li>
          <li>
            <Link
              to="/loginpage"
              onClick={() => {
                M.Sidenav.getInstance(this.sidenav).close();
                signOut();
              }}
            >
              <i className="material-icons">power_settings_new</i>Sign Out
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
// export this component with the neccessary data
const mapStateToProps = (state) => {
  const { users } = state.firestore.ordered;
  // find the user
  const user = users && users.find((i) => i.id === state.firebase.auth.uid);
  // get their username
  const username = user && user.username;
  // get their picture
  const profilePictureURL = user && user.profilePictureURL;
  return {
    profilePictureURL,
    username,
    isLoggedIn: state.firebase.auth.uid,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(actionSignOut()),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  // connect firestore with all posts and users
  firestoreConnect([{ collection: 'users' }]),
)(SideBar);
