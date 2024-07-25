import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminRegistrationForm.css";
import Navbar from "./Navbar";
import coverImage from "../assets/image/pexels-pixabay-159751.jpg";

function AdminRegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/admin_signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw new Error("Failed to register admin");
      })
      .then((data) => {
        console.log("Admin registered:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="admin-registration-form">
      <Navbar />
      <div className="admin-image-container">
        <img src={coverImage} className="admin-cover-image" alt="pexels" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <h2 className="admin-title">Admin Registration</h2>
            <label id="labels">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label id="labels">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label id="labels">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <Link to="/login">
              <button type="submit">Register Admin</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminRegistrationForm;
