import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Navbar from "./Navbar";
import { useHistory } from "react-router-dom";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  function postLogin(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:5555/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
        history.push("/course");
      }
    });
  }

  return (
    <div>
      <Navbar />
      <h1>Log in</h1>
      <form className="login" onSubmit={postLogin}>
        <div className="form-group">
          <label>
            Email
          </label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            pattern="^[a-z0-9_]{3,}$"
            placeholder="Enter username"
            required
          />
        </div>
        <div className="form-group">
          <label>
            Password
          </label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            pattern="^[a-z0-9_]{3,}$"
            required
          />
        </div>
        <div className="form-group">
          <button className="login-button">Log in</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
