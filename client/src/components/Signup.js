import React from "react";
import Navbar from "./Navbar";
import "./Signup.css";

function Signup() {
  return (
    <div>
      <div>
      <Navbar/>
      </div>
      <form className="signup">
        <h1>Signup</h1>
        <label for="">First Name<input className="inputs" id="" type="text"/></label>
        <label for="">Last Name<input id="" className="inputs" type="text"/></label>
        <label for="">Username<input id="" className="inputs" type="text"/></label>
        <label for="">Email<input id="" className="inputs" type="text"/></label>
        <label for="">Password<input className="inputs" id="" type="text"/></label>
        <button className="signup-btn">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
