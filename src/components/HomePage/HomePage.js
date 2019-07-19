import React from 'react';
import './HomePage.scss';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import M from 'materialize-css';
import Item from '../Item/Item';


export class HomePage extends React.Component {
  // get a reference to the element after the component has mounted
  componentDidMount() {
    M.Sidenav.init(this.sidenav);
    M.Collapsible.init(this.collapsible);
  }

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
            <div className="user-view">
              <div className="background">
                <img
                  alt=""
                  src="https://bodhispiritualcenter.org/wp-content/uploads/2014/10/redwoods-looking-up-650x487.jpg"
                  className="centered"
                />
              </div>
              <a href="#user">
                <img
                  alt=""
                  src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs/5536321/original/stickfigure/make-a-hand-drawn-stick-figure-portrait.png"
                  className="circle"
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
            <div className="div" />
          </li>
          <ul
            className="collapsible"
            ref={(collapsible) => {
              this.collapsible = collapsible;
            }}
          >
            <li>
              <div className="collapsible-header">
                <i className="material-icons">home</i>First
              </div>
              <div className="collapsible-body">
                <p>Found Items</p>
                <p>Lost Items</p>
              </div>
            </li>
            <li>
              <div className="collapsible-header">
                <i className="material-icons">person</i>Second
              </div>
              <div className="collapsible-body">
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
  }
}

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
