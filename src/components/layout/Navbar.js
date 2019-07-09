import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";

const Navbar = () => {
  return (
    // Makes a dark grey background by 3 shades
    // Materialized class
    <nav className="nav-wrapper grey darken-3">
      {/* //Contain all the content inside a central column on the page */}
      <div className="container">
        <Link to="/" className="brand-logo">
          Slug&Found
        </Link>
        <SignedInLinks />
      </div>
    </nav>
  );
};

export default Navbar;
