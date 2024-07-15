import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import MyCourseCard from "./MyCourseCard";

function MyCourses() {
  const [mycourses, setMyCourses] = useState([]);

  //return to fetch courses from api endpoint/ database
  //const baseUrl = "http://localhost:3031";
  useEffect(() => {
    fetch("http://127.0.0.1:5555/mycourses")
      .then((response) => response.json())
      .then((courses) => setMyCourses(courses))
      .catch((err) => console.log("deleting course failed", err));
  }, []);

  function removeCourse(id) {
    fetch(`http://127.0.0.1:5555/mycourses/${id}`, {
      method: "DELETE",
    })
      .then(() => handleDelete(id))
      .catch((err) => console.log(err));
  }

  function handleDelete(id) {
    const updatedCourses = mycourses.filter((course) => course.id !== id);
    setMyCourses(updatedCourses);
  }

  console.log(mycourses);

  return (
    <div className="mycourses">
      <Navbar />
      <h2>My Courses</h2>
      <div className="card-container">
        {mycourses &&
          mycourses.map((course) => (
            <MyCourseCard
              key={course.id}
              image={course.image}
              title={course.title}
              description={course.description}
              removeCourse={removeCourse}
            />
          ))}
      </div>
    </div>
  );
}

export default MyCourses;
