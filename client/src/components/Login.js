import React from "react";
import "./Login.css";

function Login() {
  return (
    <div>

      <form className="login">
        <h1>Login</h1>
        <label for="">
          Username
          <input type="text" />
        </label>
        <label for="">
          Password
          <input type="text" />
        </label>
        <button className="login-button">Log in</button>
      </form>
    </div>
  );
}

export default Login;
