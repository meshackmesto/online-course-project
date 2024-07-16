import React, { useState } from "react";
import Navbar from "./Navbar";
import "./Signup.css";
import { useHistory } from "react-router-dom";

function Signup({ setUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  /*  const [username, setUsername] = useState(""); */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /* const [passwordConfirmation, setPasswordConfirmation] = useState(""); */
  const [formSubmitted, setFormSubmitted] = useState(false);

  const history = useHistory();

  //const baseUrl = "http://localhost:3031";
  function postSignup(e) {
    e.preventDefault();
    setFormSubmitted(true);
    fetch("http://127.0.0.1:5555/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          history.push("/login");
        });
      }
    });
  }

  /* const submitForm = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  }; */

  return (
    <div>
      <Navbar />
      <form className="signup bg-dark" onSubmit={postSignup}>
        <h1>Sign up</h1>
        <label htmlFor="first_name">
          First Name
          <input
            className="inputs"
            id="first_name"
            type="text"
            autoComplete="off"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            pattern="^[A-Za-z\-']+$"
            placeholder="John"
            required
          />
        </label>
        <label htmlFor="last_name">
          Last Name
          <input
            id="last_name"
            className="inputs"
            type="text"
            autoComplete="off"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            pattern="^[A-Za-z\-']+$"
            placeholder="Doe"
            required
          />
        </label>
        {/*  <label htmlFor="username">
          Username
          <input
            id="username"
            className="inputs"
            type="text"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            pattern="^[A-Za-z\-']+$"
            required
          />
        </label> */}
        <label htmlFor="email">
          Email
          <input
            id="email"
            className="inputs"
            type="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            placeholder="hunni@gmail"
            required
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            className="inputs"
            id="password"
            type="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            pattern="^[a-z0-9_]{3,}$"
            placeholder="Password"
            required
          />
        </label>

        <button type="submit" className="signup-button">
          Sign up
        </button>

      </form>
      {formSubmitted ? <p>Sign up successful!</p> : null}
    </div>
  );
}

export default Signup;
