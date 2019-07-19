import React from 'react';
import './ItemPage.scss';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';

export const ItemPage = (props) => {
  // these are the props need for this component
  const { post, isLoggedIn } = props;
  // redirect use to login if they are not logged in
  if (!isLoggedIn) return <Redirect to="/login" />;
  // render this to the screen
  return (
    <>
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
          <div>Location:</div>
         <div id="ItemPage-timeDate">{`${moment(post.createdAt).calendar()}`}</div>
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
  // find the post with the id
  const post = posts && posts.find((i) => i.id === id);
  return {
    post,
    isLoggedIn: state.firebase.auth.uid,
  };
};
// export this component with the neccessary data
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'posts' }]),
)(ItemPage);
