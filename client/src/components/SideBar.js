import React from "react";
import { bubble as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

export default props => {
  return (
    <Menu>
      <Link to="/Home" className="menu-item">
        Home
      </Link>
      <Link to="/Login" className="menu-item">
        Log In
      </Link>
      <Link to="/Register" className="menu-item">
        Sign Up
      </Link>
    </Menu>
  );
};
