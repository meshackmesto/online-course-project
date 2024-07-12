import React from "react";
import Navbar from "./Navbar";
import books from "../assets/image/books.jpg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-1">
            <h1>
              Welcome to our Online Course Website, where learning meets
              innovation
            </h1>
            <p>
              At [Course Website Name], we are dedicated to providing you with
              top-quality courses designed to empower and inspire. Whether
              you're looking to enhance your professional skills or explore a
              new passion, we have curated a diverse selection of courses
              crafted by experts in their fields.
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
