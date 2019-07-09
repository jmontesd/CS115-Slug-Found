import React from "react";
// Gives access to the active class when a certain link is active
import { NavLink } from "react-router-dom";

const SignedInLinks = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/">New Item</NavLink>
      </li>
      <li>
        <NavLink to="/">Log Out</NavLink>
      </li>
      <li>
        <NavLink to="/" className="btn btn-floating blue lighten-1">
          JM
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedInLinks;
