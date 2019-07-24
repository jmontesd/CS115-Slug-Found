import React, { useState } from 'react';
import './ProfilePage.scss';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Item from '../Item/Item';
import logo from '../logo.jpg';
import { updateProfileImage as updateProfileImageAction } from '../../store/actions/authActions';
import { createMessageGroup as createMessageGroupAction } from '../../store/actions/messageActions';

export const ProfilePage = (props) => {
  // used to redirect user
  const [redirect, setRedirect] = useState('');
  if (redirect) return <Redirect to={redirect} />;
  // these are the props need for this component
  const {
    createMessageGroup,
    id,
    isLoggedIn,
    isUserProfileTheUserLoggedIn,
    messageGroup,
    posts,
    profilePictureURL,
    updateProfileImage,
    username,
  } = props;
  // redirect use to login if they are not logged in
  if (!isLoggedIn) return <Redirect to="/login" />;
  // this is used to handle when user uploads image
  const handleFileChange = (e) => {
    // check to make sure they submitted file
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      // update their profile image
      updateProfileImage(imageFile);
    }
  };
  const handleMessage = () => {
    if (!messageGroup) {
      createMessageGroup(id);
    }
    setRedirect(`/messages/${id}`);
  };
  // render this to the screen
  return (
    <div className="container">
      <img className="logo" src={logo} alt="Logo" width={300} inputMode="scale" />
      <div className="ProfilePage-row row">
        <div className="col-8">
          {/* if there are posts, render them to the screen */}
          {posts &&
            posts
              .slice()
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((post) => <Item key={post.id} post={post} />)}
        </div>
        <div className="col-4">
          <div className="ProfilePage-wrapper">
            <img src={profilePictureURL} className="ProfilePage-img-card" alt="Profile" />
            {/* if the user profile is the user logged in, render change profile picture button */}
            {isUserProfileTheUserLoggedIn && (
              <label className="btn btn-outline-info cursor-pointer d-block mt-2 ">
                <input className="d-none" type="file" onChange={handleFileChange} />
                Change Profile Picture
              </label>
            )}
            <div className="ProfilePage-card-title">{username}</div>
            {!isUserProfileTheUserLoggedIn && (
              <button type="button" onClick={handleMessage} className="btn btn-warning full-width">
                Message
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  // get user id of the profile currently visiting
  const { id } = props.match.params;
  // get all posts and all users
  const { posts: allPosts, users } = state.firestore.ordered;
  // find the user
  const user = users && users.find((i) => i.id === id);
  // get their username
  const username = user && user.username;
  // get their picture
  const profilePictureURL = user && user.profilePictureURL;
  // find there posts
  const posts = allPosts && allPosts.filter((i) => i.user.id === id);
  // check if user profile is the user logged in
  const isUserProfileTheUserLoggedIn = id === state.firebase.auth.uid;
  // get all messages
  const { messages: allMessageGroups } = state.firestore.ordered;
  // get id of sender
  const fromId = state.firebase.auth.uid;
  // use to distinguish between message groups
  let smallerId;
  let greaterId;
  if (fromId > id) {
    greaterId = fromId;
    smallerId = id;
  } else {
    greaterId = id;
    smallerId = fromId;
  }
  // find the message group
  const messageGroup =
    allMessageGroups &&
    allMessageGroups.find((m) => m.smallerId === smallerId && m.greaterId === greaterId);
  return {
    id,
    isLoggedIn: state.firebase.auth.uid,
    isUserProfileTheUserLoggedIn,
    messageGroup,
    profilePictureURL,
    posts,
    username,
  };
};
// get the updateProfileImage function which will update profile image
// for the user
const mapDispatchToProps = (dispatch) => ({
  updateProfileImage: (update) => dispatch(updateProfileImageAction(update)),
  createMessageGroup: (toId) => dispatch(createMessageGroupAction(toId)),
});
// export this component with the neccessary data
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  // connect firestore with all posts and users
  firestoreConnect([{ collection: 'messages' }, { collection: 'posts' }, { collection: 'users' }]),
)(ProfilePage);
