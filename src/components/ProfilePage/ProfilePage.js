import React from 'react';
import './ProfilePage.scss';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Item from '../Item/Item';
import { updateProfileImage as updateProfileImageAction } from '../../store/actions/authActions';

const ProfilePage = (props) => {
  const {
    username,
    posts,
    isLoggedIn,
    profilePictureURL,
    isUserProfileTheUserLoggedIn,
    updateProfileImage,
  } = props;

  if (!isLoggedIn) return <Redirect to="/login" />;

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      updateProfileImage(imageFile);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          {posts &&
            posts
              .slice()
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((post) => (
                <div>
                  <Item key={post.id} post={post} />
                </div>
              ))}
        </div>
        <div className="col-4">
          <div className="profile-wrapper">
            <img src={profilePictureURL} className="img-card" alt="Profile" />
            {isUserProfileTheUserLoggedIn && (
              <>
                <div htmlFor="file">Profile Picture</div>
                <label className="btn btn-outline-info cursor-pointer">
                  <input className="d-none" type="file" onChange={handleFileChange} />
                  Change Profile Picture
                </label>
              </>
            )}
            <div className="card-title">{username}</div>
            <Link to="/messages" className="btn btn-warning full-width">
              Message
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  const { posts: allPosts, users } = state.firestore.ordered;
  const user = users && users.find((i) => i.id === id);
  const username = user && user.username;
  const profilePictureURL = user && user.profilePictureURL;
  const posts = allPosts && allPosts.filter((i) => i.user.id === id);
  const isUserProfileTheUserLoggedIn = id === state.firebase.auth.uid;
  return {
    isLoggedIn: state.firebase.auth.uid,
    isUserProfileTheUserLoggedIn,
    profilePictureURL,
    posts,
    username,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateProfileImage: (update) => dispatch(updateProfileImageAction(update)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  firestoreConnect([{ collection: 'posts' }, { collection: 'users' }]),
)(ProfilePage);
