import React from 'react';
import './HomePage.scss';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Item from '../Item/Item';

const HomePage = (props) => {
  const { posts, isLoggedIn } = props;

  if (!isLoggedIn) return <Redirect to="/login" />;

  return (
    <div class="container section">
        <ul class="sidenav sidenav-fixed" id="menu-side">
          <li>
            <div class="user-view">
              <div class="background">
                <img src="https://bodhispiritualcenter.org/wp-content/uploads/2014/10/redwoods-looking-up-650x487.jpg" class="centered"/>
              </div>
              <a href="#user">
                <img
                  src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs/5536321/original/stickfigure/make-a-hand-drawn-stick-figure-portrait.png"
                  class="circle"
                />
              </a>
              <a href="#name">
                {/* <span class="name white"> Jacqueline Montes</span> */}
                <span class="center-align name white">Jacqueline Montes</span>
                <p>

                </p>
              </a>
              <a href="#email">
                <span class="center-align name white"> jmontesd@ucsc.edu</span>
              </a>
            </div>
            <div className="div"></div>
          </li>
          <ul class="collapsible">
            <li>
              <div class="collapsible-header">
                <i class="material-icons">home</i>First
              </div>
              <div class="collapsible-body">
                <p>Found Items</p>
                <p>Lost Items</p>
              </div>
            </li>
            <li>
              <div class="collapsible-header">
                <i class="material-icons">person</i>Second
              </div>
              <div class="collapsible-body">
                <span>Lorem ipsum dolor sit amet.</span>
              </div>
            </li>
          </ul>
        </ul>
      
  

    <div className="container" id="body">
      {posts &&
        posts
          .slice()
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((post) => <Item key={post.id} post={post} />)}
    </div>

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
)(HomePage);
