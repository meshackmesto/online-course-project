import React, { useState, useContext } from "react";
import "./LoginAdmin.css";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserProvider";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function LoginAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useContext(UserContext);
  const history = useHistory();

  const API = process.env.REACT_APP_SERVER_API;

  function postLogin(e) {
    e.preventDefault();
    fetch(`${API}/loginadmin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAdmin(data);
        history.push("/admin-courses");
      })
      .catch((err) => {
        alert("Incorrect validation user details!");
        console.log("Error fetching data", err);
      });
  }

  return (
    <div>
      {/*  <div className="login-image-container">
        <img src={coverImage} className="cover-image" alt="pexels" />
      </div> */}

      {/* <div className="admin-form-container"> */}
      <form className="admin-login" onSubmit={postLogin}>
        <div className="form-group">
          <h2 className="admin-title">Log in</h2>
          <label id="labels">Username</label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>
        <div className="form-group">
          <label id="labels">Password</label>
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
          <NavLink to="/adminhome">
            <button className="login-button">Log in</button>
          </NavLink>
        </div>
      </form>
      {/* </div> */}
    </div>
  );
}

export default LoginAdmin;
