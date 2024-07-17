import React from "react";
import { NavLink } from "react-router-dom";
import onlinecourse from "../assets/image/onlinecourse.jpg";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={onlinecourse} alt="" to="/"/>
      </div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/course">Courses</NavLink>
        </li>
        <li>
          <NavLink to="/mycourses">My Courses</NavLink>
        </li>
        <li>
          <NavLink to="/students">Students</NavLink>
        </li>
        <li>
          <NavLink to="/reviews">Reviews </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
