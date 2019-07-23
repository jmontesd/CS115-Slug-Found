import React from 'react';
import './SideBar.scss';
import { compose } from 'redux';
// import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import M from 'materialize-css';

export class SideBar extends React.Component{
  // get a reference to the element after the component has mounted
  componentDidMount() {
    M.Sidenav.init(this.sidenav);
    M.Collapsible.init(this.collapsible);
  }

  render() {
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) return <Redirect to="/login" />;

    return (
      <div className="container section">
        <a href="toggleBtn" class="sidenav-trigger" data-target="menu-side">
          <i className="material-icons">menu</i>
        </a>
        <ul
          className="sidenav"
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
                <span className="center-align name white"> jmontesd@ucsc.edu </span>
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
                {/* <p><Link to= {user/isLoggedIn}> My Profile </Link></p> */}
                <p><Link to= "/messages"> My Messages </Link></p>
              </div>
            </li>
          </ul>
        </ul>
      </div>
    );
  }
}
// export this component with the neccessary data
const mapStateToProps = (state) => ({
    isLoggedIn: state.firebase.auth.uid,
  });

export default compose(
  connect(mapStateToProps),
)(SideBar);
