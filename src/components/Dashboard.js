import React, { Component } from "react";
import LostItem from "../items/LostItem";
import FoundItem from "../items/FoundItem";

class Dashboard extends Component {
  render() {
    return (
      <div class="container section">
        <ul class="sidenav sidenav-fixed" id="menu-side">
          <li>
            <div class="user-view">
              <div class="background">
                <img src="https://i.pinimg.com/736x/bc/c1/80/bcc1803e1c59e1443bd492acfafa5dbc.jpg" />
              </div>
              <a href="#user">
                <img
                  src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs/5536321/original/stickfigure/make-a-hand-drawn-stick-figure-portrait.png"
                  class="circle"
                />
              </a>
              <a href="#name">
                <span class="name black-text"> Jacqueline Montes</span>
              </a>
              <a href="#email">
                <span class="name black-text"> jmontesd@ucsc.edu</span>
              </a>
            </div>
          </li>
          <ul class="collapsible">
            <li>
              <div class="collapsible-header">
                <i class="material-icons">home</i>HomePage
                <i class="material-icons right" style={{ marginRight: -10 }}>
                  arrow_drop_down
                </i>
              </div>
              <div class="collapsible-body">
                <p>Found Items</p>
                <p>Lost Items</p>
              </div>
            </li>
            <li>
              <div class="collapsible-header">
                <i class="material-icons">person</i>My Profile
                <i class="material-icons right" style={{ marginRight: -10 }}>
                  arrow_drop_down
                </i>
              </div>
              <div class="collapsible-body">
                <p>Posts</p>
                <p>Messages</p>
              </div>
            </li>
          </ul>
        </ul>
      </div>
    );
  }
}

export default Dashboard;
