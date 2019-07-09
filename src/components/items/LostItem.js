import React, { Component } from "react";
import ItemSummary from "./ItemSummary";

const LostItems = () => {
  return (
    <div className="lost-item-list section">
      {/* //Each post for items */}
      <div class="divider" />
      <div class="section" />
      <ItemSummary />
      <ItemSummary />
      <ItemSummary />
      <ItemSummary />
    </div>
  );
};

export default LostItems;
