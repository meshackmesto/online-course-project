import React, { useState } from "react";
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
      <form className="login" onSubmit={postLogin}>
        <h1>Log in</h1>
        <label for="">
          Username
          <input
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label for="">
          Password
          <input
            type="text"
            id="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="login-button">Log in</button>
      </form>
    </div>
  );
}

export default Login;
