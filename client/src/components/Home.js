import React from "react";
import Navbar from "./Navbar";
import books from "../assets/image/books.jpg";
import { Link, NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-1">
            <NavLink to="/signup">
              <button className="signup-btn">Sign up</button>
            </NavLink>
            <NavLink to="/login">
              <button className="login-btn">Log in</button>
            </NavLink>
            <NavLink to="/admin_signup">
              <button className="admin-btn">Admin</button>
            </NavLink>
            <h1>
              Welcome to our Online Course Registration App, where learning
              meets innovation.
            </h1>
            <p>
              We are dedicated to providing you with top-quality courses
              designed to empower and inspire. Whether you're looking to enhance
              your professional skills or explore a new passion, we have curated
              a diverse selection of courses crafted by experts in their fields.
            </p>
          </div>
          <div className="col-2">
            <img src={books} alt="" />
          </div>

          <Link to={`/course`} className="btn btn-primary">
            Available Courses
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
