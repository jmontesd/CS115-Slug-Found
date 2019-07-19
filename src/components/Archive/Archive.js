import React from 'react';
import './Archive.scss';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Item from '../Item/Item';

const Archive = (props) => {
  const { posts, isLoggedIn } = props;

  if (!isLoggedIn) return <Redirect to="/login" />;

  return (
    <div className="container">
      {posts &&
        posts
          .slice()
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((post) => <Item key={post.id} post={post} />)}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { posts } = state.firestore.ordered;
  return {
    posts,
    isLoggedIn: state.firebase.auth.uid,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'posts' }]),
)(Archive);

// for archive page, need to add collection of deleted posts in firebase
