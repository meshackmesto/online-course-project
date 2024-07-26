import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminRegistrationForm.css";
import Navbar from "./Navbar";
import LoginAdmin from "./LoginAdmin";
import coverImage from "../assets/image/pexels-pixabay-159751.jpg";

function AdminRegistrationForm({ setAdmin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:5555/admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw new Error("Failed to register admin");
      })
      .then((admin) => {
        setAdmin(admin);
        setResponseMessage("Admin registered:");
        setUsername("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Error:", error);
        setResponseMessage("Admin registered successfully!");
      });
  };

  return (
    <div className="admin-registration-form">
      <Navbar />
      <LoginAdmin />
      <div className="admin-image-container">
        <img src={coverImage} className="admin-cover-image" alt="pexels" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <h2 className="admin-title">Admin Registration</h2>
            <label id="labels">Username:</label>
            <input
              placeholder="Enter Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label id="labels">Email:</label>
            <input
              placeholder="Enter Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label id="labels">Password:</label>
            <input
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            {/* <Link to="/login"> */}
            <button type="submit">Register Admin</button>
            {/* </Link> */}
          </div>
          {responseMessage && (
            <p className="response-admin">{responseMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AdminRegistrationForm;
