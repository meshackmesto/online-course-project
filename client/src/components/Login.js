import React, { useState } from "react";
import "./Login.css";
import Navbar from "./Navbar";
import { useHistory } from "react-router-dom";
import coverImage from "../assets/image/pexels-guiirossi-2553427 (15).jpg";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function postLogin(e) {
    e.preventDefault();
    fetch("http://localhost:5555/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname: username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        history.push("/course");
      })
      .catch((err) => {
        alert("Incorrect validation user details!");
        console.log("Error fetching data", err);
      });
  }

  return (
    <div>
      <Navbar />

      <div className="login-image-container">
        <img src={coverImage} className="cover-image" alt="pexels" />
      </div>

      <div className="login-form-container">
        <form className="login" onSubmit={postLogin}>
          <div className="form-group">
            <h1>Log in</h1>
            <label>Username</label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter firstname"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="form-group">
            <button className="login-button">Log in</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
