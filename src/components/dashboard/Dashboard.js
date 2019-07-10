import React, { Component } from "react";
import LostItem from "../items/LostItem";
import FoundItem from "../items/FoundItem";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard container">
        <div className="row">
          {/* // 12 columns on small screens and 6 on medium size
          <div className="col s12 m6" />
          <ItemList /> */}

          <div class="col m5 center-align card-panel indigo darken-1">
            <span class="title-color white-text">
              <h5>Lost Items</h5>
            </span>
            <LostItem />
          </div>
          <div class="col m5 center-align card-panel indigo darken-1 offset-m1">
            <span class="title-color white-text">
              <h5>Found Items</h5>
            </span>
            <FoundItem />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
