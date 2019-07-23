import React, { useState } from 'react';
import './ItemPage.scss';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';
import logo from '../logo.jpg';
import { deletePost as deletePostAction } from '../../store/actions/postActions';

export const ItemPage = (props) => {
  const [redirect, setRedirect] = useState(false);
  // these are the props need for this component
  const { deletePost, post, isLoggedIn, firebasePostId, isUserProfileTheUserLoggedIn } = props;
  // redirect use to login if they are not logged in
  if (!isLoggedIn) return <Redirect to="/login" />;
  // handle deleting post
  const handleDelete = () => {
    deletePost(post.id, firebasePostId);
    setRedirect(true);
  };
  // after deleting post, go back to home page
  if (redirect) {
    return <Redirect to="/" />;
  }
  // render this to the screen
  return (
    
    <>
    <img className="logo" src={logo} alt="Logo" width={300} inputMode="scale"  />
      {/* if there is a post, render it */}
      {post && (
        
        <div className="container">
          <div className="ItemPage-Title">{post.title}</div>
          <div id="ItemPage-background">
          <div id="ItemPage-person">
            {'Posted By: '}
            <Link to={`/profile/${post.user.id}`}>{post.user.name}</Link>
          </div>
          {/* formats date */}
          <div id="ItemPage-post">{post.description}</div>
          <img alt="item" src={post.imageURL} id="ItemPage-imageSize"/> 
          <div id="ItemPage-location">Location: {post.location}</div>
          <div id="ItemPage-timeDate">{`${moment(post.createdAt).calendar()}`}</div>
          {isUserProfileTheUserLoggedIn && (
            <button type="button" className="btn btn-danger d-block" onClick={handleDelete}>
              Delete
            </button>
          )}
         
        </div>
        </div>
      )}
    </>
  );
};
// check to see if user is logged in
// and pass that as a prop to the component
const mapStateToProps = (state, props) => {
  // get id of item
  const { id } = props.match.params;
  // get all posts
  const { posts } = state.firestore.ordered;
  // find the firebase id
  const firebasePostId =
    state.firestore.data.posts &&
    Object.keys(state.firestore.data.posts).find(
      (key) => state.firestore.data.posts[key] && state.firestore.data.posts[key].id === id,
    );
  // find the post with the id
  const post = posts && posts.find((i) => i.id === id);
  // check if the user is logged in
  const isUserProfileTheUserLoggedIn = post && post.user.id === state.firebase.auth.uid;
  return {
    firebasePostId,
    post,
    isLoggedIn: state.firebase.auth.uid,
    isUserProfileTheUserLoggedIn,
  };
};
const mapDispatchToProps = (dispatch) => ({
  deletePost: (post, firebasePostId) => dispatch(deletePostAction(post, firebasePostId)),
});
// export this component with the neccessary data
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  firestoreConnect([{ collection: 'posts' }]),
)(ItemPage);
