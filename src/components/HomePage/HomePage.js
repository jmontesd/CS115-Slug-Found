import React from 'react';
import './HomePage.scss';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Item from '../Item/Item';

export const HomePage = (props) => {
  // these are the props need for this component
  const { posts, isLoggedIn } = props;
  // redirect use to login if they are not logged in
  if (!isLoggedIn) return <Redirect to="/login" />;
  // render this to the screen
  return (
    <div className="container">
      {/* check if there are posts and if there are render them to screen
      sorted by date they are created */}
      {posts &&
        posts
          .slice()
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((post) => <Item key={post.id} post={post} />)}
    </div>
  );
};
// pass props to component
const mapStateToProps = (state) => {
  // get all posts from firebase
  const { posts } = state.firestore.ordered;
  return {
    posts,
    isLoggedIn: state.firebase.auth.uid,
  };
};
// export this component with the neccessary data
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'posts' }]),
)(HomePage);
