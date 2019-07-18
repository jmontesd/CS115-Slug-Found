import React from 'react';
import './HomePage.scss';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import M from 'materialize-css';
import Item from '../Item/Item';

<<<<<<< HEAD
const HomePage = (props) => {
 

  const { posts, isLoggedIn } = props;
=======
class HomePage extends React.Component {
  // get a reference to the element after the component has mounted
  componentDidMount() {
    M.Sidenav.init(this.sidenav);
    M.Collapsible.init(this.collapsible);
  }
>>>>>>> 5eb9a8959b608db3f522554be6ade226ed61f63a

  render() {
    const { posts, isLoggedIn } = this.props;

    if (!isLoggedIn) return <Redirect to="/login" />;

    return (
      <div className="container section">
        <ul
          className="sidenav sidenav-fixed"
          id="menu-side"
          ref={(sidenav) => {
            this.sidenav = sidenav;
          }}
        >
          <li>
<<<<<<< HEAD
            <div class="user-view">
              <div class="background">
                <img src="https://bodhispiritualcenter.org/wp-content/uploads/2014/10/redwoods-looking-up-650x487.jpg"
                 class="centered"
                  alt="" 
                  />
=======
            <div className="user-view">
              <div className="background">
                <img
                  alt=""
                  src="https://bodhispiritualcenter.org/wp-content/uploads/2014/10/redwoods-looking-up-650x487.jpg"
                  className="centered"
                />
>>>>>>> 5eb9a8959b608db3f522554be6ade226ed61f63a
              </div>
              <a href="#user">
                <img
                  alt=""
                  src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs/5536321/original/stickfigure/make-a-hand-drawn-stick-figure-portrait.png"
<<<<<<< HEAD
                  class="circle"
                  alt=""
=======
                  className="circle"
>>>>>>> 5eb9a8959b608db3f522554be6ade226ed61f63a
                />
              </a>
              <a href="#name">
                {/* <span class="name white"> Jacqueline Montes</span> */}
                <span className="center-align name white">Jacqueline Montes</span>
                <p />
              </a>
              <a href="#email">
                <span className="center-align name white"> jmontesd@ucsc.edu</span>
              </a>
            </div>
<<<<<<< HEAD
=======
            <div className="div" />
>>>>>>> 5eb9a8959b608db3f522554be6ade226ed61f63a
          </li>
          <ul
            className="collapsible"
            ref={(collapsible) => {
              this.collapsible = collapsible;
            }}
          >
            <li>
<<<<<<< HEAD
              <div class="collapsible-header">
                <i class="material-icons">home</i>HomePage
                <i class="material-icons right" style={{ marginRight: -10 }}>
                  arrow_drop_down
                </i>
=======
              <div className="collapsible-header">
                <i className="material-icons">home</i>First
>>>>>>> 5eb9a8959b608db3f522554be6ade226ed61f63a
              </div>
              <div className="collapsible-body">
                <p>Found Items</p>
                <p>Lost Items</p>
              </div>
            </li>
            <li>
<<<<<<< HEAD
              <div class="collapsible-header">
                <i class="material-icons">person</i>My Profile
                <i class="material-icons right" style={{ marginRight: -10 }}>
                  arrow_drop_down
                </i>
              </div>
              <div class="collapsible-body">
                <p>Posts</p>
                <p>Messages</p>
=======
              <div className="collapsible-header">
                <i className="material-icons">person</i>Second
              </div>
              <div className="collapsible-body">
                <span>Lorem ipsum dolor sit amet.</span>
>>>>>>> 5eb9a8959b608db3f522554be6ade226ed61f63a
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
  }
}

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
