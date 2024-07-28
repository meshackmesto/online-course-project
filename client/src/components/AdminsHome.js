import React from "react";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";

function AdminsHome() {
  return (
    <div className="home">
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Welcome to the Admins side.</h1>
            <NavLink to="/admin-courses">
              <button className="btn courses-btn">Courses</button>
            </NavLink>
            <NavLink to="/admin-review">
              <button className="btn reviews-btn">Reviews</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminsHome;
