import React from 'react';
import './ItemPage.scss';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';

const ItemPage = (props) => {
  const { post, isLoggedIn } = props;

  if (!isLoggedIn) return <Redirect to="/login" />;

  return (
    <>
      {post && (
        <div className="container">
          <div>
            {'Posted By: '}
            <Link to={`/profile/${post.user.id}`}>{post.user.name}</Link>
          </div>
          <div>{`${moment(post.createdAt).calendar()}`}</div>
          <div>{post.title}</div>
          <div>{post.description}</div>
          <img alt="item" src={post.imageURL} />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  const { posts } = state.firestore.ordered;
  const post = posts && posts.find((i) => i.id === id);
  return {
    post,
    isLoggedIn: state.firebase.auth.uid,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'posts' }]),
)(ItemPage);
