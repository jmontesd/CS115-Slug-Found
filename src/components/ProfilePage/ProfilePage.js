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
      <div className="row">
        <div className="col-8">
          {posts &&
            posts
              .slice()
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((post) => <div> <Item key={post.id} post={post} /> </div>)}
        </div>
        <div className="col-4" >
          <div className="profile-wrapper">
            <img src="https://firebasestorage.googleapis.com/v0/b/slug-and-found.appspot.com/o/images%2Fa12e2b48-2f36-40a2-88ad-8599307a2f14?alt=media&token=d2b68eda-5751-4e03-bca2-ae951a0765e6" className="img-card" alt="" />
            <div className="card-title">
              {username}
            </div>
            <a className="btn btn-warning btn-card"> Message </a>
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
