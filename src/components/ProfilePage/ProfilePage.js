import React from 'react';
import './ProfilePage.scss';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Item from '../Item/Item';

const ProfilePage = (props) => {
  const { username, posts, isLoggedIn, profilePictureURL } = props;

  if (!isLoggedIn) return <Redirect to="/login" />;

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
            <img src={profilePictureURL} className="img-card" alt="Profile Picutre" />
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
  return {
    profilePictureURL,
    username,
    posts,
    isLoggedIn: state.firebase.auth.uid,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'posts' }, { collection: 'users' }]),
)(ProfilePage);
