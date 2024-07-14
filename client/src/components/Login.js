import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const baseUrl = "http://localhost:3031";
  function postLogin(e) {
    e.preventDefault();
    fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }

  return (
    <div>
      <form className="login bg-dark" onSubmit={postLogin}>
        <h1>Log in</h1>
        <label for="">
          Username
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
        </label>
        <label for="">
          Password
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
        </label>
        
          <button className="login-button">Log in</button>
        
      </form>
    </div>
  );
}

export default Login;
