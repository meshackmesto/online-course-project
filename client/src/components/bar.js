import React from "react";
import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <div className="navbar">
      <NavLink to="/signup">
        <button className="signup-btn">Signup</button>
      </NavLink>
      <NavLink to="/login">
        <button className="login-btn">Login</button>
      </NavLink>
    </div>
  );
}

export default Navbar;
