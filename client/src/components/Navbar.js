import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar bg-dark">
      <div className="logo">
        <a href="/">Logo</a>
      </div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/course">Course</NavLink>
        </li>
        <li>
          <NavLink to="/mycourses">My Courses</NavLink>
        </li>
        <li>
          <NavLink to="/enrollment">Enrollment </NavLink>
        </li>
        <li>
          <NavLink to="/reviews">Reviews </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
