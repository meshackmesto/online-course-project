import React, { useState } from "react";
import Navbar from "./Navbar";
import "./Signup.css";
import { useHistory } from "react-router-dom";
import coverImage from "../assets/image/pexels-enginakyurt-2767814 (2).jpg";

function Signup({ setUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const history = useHistory();

  function postSignup(e) {
    e.preventDefault();
    setFormSubmitted(true);

    fetch("http://127.0.0.1:5555/signup", {
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

  return (
    <div>
      <Navbar />
      
      <div className="signup-image-container">
        <img src={coverImage} className="cover-image" alt="pexels" />
      </div>

      <div className="signup-form-container">
      <form className="signup" onSubmit={postSignup}>
        <div className="form-group">
         <h1>Sign up</h1>
          <label htmlFor="first_name">First Name</label>
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
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
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
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
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
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
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
        </div>
        <div className="form-group">
          <button type="submit" className="signup-button">
            Sign up
          </button>
        </div>
      </form>
      {formSubmitted ? <p>Sign up successful!</p> : null}
    </div>
    </div>
  );
}

export default Signup;
