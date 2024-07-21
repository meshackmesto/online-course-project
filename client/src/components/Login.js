import React, { useState } from "react";
import "./Login.css";
import Navbar from "./Navbar";
import { useHistory } from "react-router-dom";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  //const baseUrl = "http://localhost:3031";
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
      <form className="login bg-dark" onSubmit={postLogin}>
        <h1>Log in</h1>
        <label for="">
          First Name
          <input
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter firstname"
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
            required
          />
        </label>

        <button className="login-button">Log in</button>
      </form>
    </div>
  );
}

export default Login;
