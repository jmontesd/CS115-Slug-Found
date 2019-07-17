import React from 'react';
import './Gallery.scss';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Gallery = (props) => {
  const { posts, isLoggedIn } = props;

  if (!isLoggedIn) return <Redirect to="/login" />;

  return (

    <div className="container">
      {posts && 
        posts
          .slice()
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((post) => <div className="gallery"> 
                            <Link to={`/item/${post.id}`}>
                              <img alt="item" src={post.imageURL} id="galleryImg" />
                            </Link> 
                          </div>)
                        // <div className="postText">
                        //   <Link to={`/item/${post.id}`}>{post.title}</Link>
                        // </div>)
        }
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
)(Gallery);
