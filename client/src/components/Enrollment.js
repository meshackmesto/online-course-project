import React from "react";
import Navbar from "./Navbar";

function Enrollment() {
  return (
    <div className="enrolled">
      <Navbar />

      <div>
        <h1>Students Enrolled</h1>
        <p>
          Below is the list of students currently enrolled in our various
          courses
        </p>
        <ul className="names">
          <li>John Doe</li>
          <li>Jane Smith</li>
          <li>Alice Johnson</li>
          <li>Bob Brown</li>
          <li>Emily Davis</li>
          <li>Michael Wilson</li>
          <li>Sarah Taylor</li>
          <li>David Lee</li>
          <li>Michael Johnson</li>
          <li>Sarah Wilson</li>
          <li>David Lee</li>
          <li>Michael Johnson</li>
          <li>Sarah Wilson</li>
          <li>David Lee</li>
          <li>Michael Johnson</li>
          <li>Sarah Wilson</li>
          <li>David Lee</li>
          <li>Michael Johnson</li>
          <li>Sarah Wilson</li>
          <li>David Lee</li>
        </ul>
      </div>
    </div>
  );
}

export default Enrollment;
