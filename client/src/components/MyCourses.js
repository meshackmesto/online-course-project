import React, { useState } from "react";
import Navbar from "./Navbar";
import CourseCard from "./CourseCard";

function MyCourses({ displayedCourses }) {
  /*  const [mycourses, setMyCourses] = useState([]);

  function handleAddCourse() {
    displayedCourses.map((course) => {
      setMyCourses(course);
    });
  }  */

  return (
    <div className="mycourses">
      <Navbar />
      <h1>My Courses</h1>
      {displayedCourses &&
        displayedCourses.map((course) => (
          <CourseCard
            title={course.title}
            description={course.description}
          />
        ))}
    </div>
  );
}

export default MyCourses;
