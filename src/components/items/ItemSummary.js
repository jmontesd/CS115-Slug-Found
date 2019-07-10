import React, { Component } from "react";

const ItemSummary = () => {
  return (
    <div className="card z-depth-0 item-summary">
      {/* // Item post details */}
      <div className="card-content grey-text text-darken-3">
        <span className="card-title red-text text-darken-2">Item Title</span>
        <p>
          Posted by: <span class="blue-text text-darken-2">UserName</span>
        </p>
        <p>
          Date: <span class="blue-text text-darken-2">Date Posted</span>{" "}
        </p>
        <p>
          Location: <span class="blue-text text-darken-2">Location</span>{" "}
        </p>
      </div>
    </div>
  );
};

export default ItemSummary;
