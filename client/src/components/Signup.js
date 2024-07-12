import React, { useState } from "react";
import Navbar from "./Navbar";
import "./Signup.css";

function Signup({ setUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  /*  const [username, setUsername] = useState(""); */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /* const [passwordConfirmation, setPasswordConfirmation] = useState(""); */

  const baseUrl = "http://localhost:3031";
  function postSignup(e) {
    e.preventDefault();
    fetch(`${baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        /* username: username, */
        email: email,
        password: password,
        /* password_confirmation: passwordConfirmation, */
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }

  return (
    <div>
      <Navbar />
      <form className="signup" onSubmit={postSignup}>
        <h1>Signup</h1>
        <label for="">
          First Name
          <input
            className="inputs"
            id="first_name"
            type="text"
            autoComplete="off"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label for="">
          Last Name
          <input
            id="last_name"
            className="inputs"
            type="text"
            autoComplete="off"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        {/*  <label for="">
          Username
          <input
            id="username"
            className="inputs"
            type="text"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label> */}
        <label for="">
          Email
          <input
            id="email"
            className="inputs"
            type="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label for="">
          Password
          <input
            className="inputs"
            id="password"
            type="text"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {/*   <label for="">
          Password Confirmation
          <input
            type="password"
            id="password-confirmation"
            autoComplete="off"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </label> */}
        <button type="submit" className="signup-button">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default Signup;
