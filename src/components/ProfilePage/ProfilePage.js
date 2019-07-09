import React from 'react';
import './ProfilePage.scss';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Item from '../Item/Item';

const ProfilePage = (props) => {
  const { username, posts, isLoggedIn } = props;

  if (!isLoggedIn) return <Redirect to="/login" />;

  return (
    <div className="container">
      <div>{username}</div>
      {posts &&
        posts
          .slice()
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((post) => <Item key={post.id} post={post} />)}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  const { posts: allPosts, users } = state.firestore.ordered;
  const user = users && users.find((i) => i.id === id);
  const username = user && user.username;
  const posts = allPosts && allPosts.filter((i) => i.user.id === id);
  return {
    username,
    posts,
    isLoggedIn: state.firebase.auth.uid,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'posts' }, { collection: 'users' }]),
)(ProfilePage);
