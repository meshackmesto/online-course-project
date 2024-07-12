import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import CourseCard from "./CourseCard";

function MyCourses() {
  const [mycourses, setMyCourses] = useState([]);

  //return to fetch courses from api endpoint/ database
  const baseUrl = "http://localhost:3031";
  useEffect(() => {
    fetch(`${baseUrl}/myCourses`)
      .then((response) => response.json())
      .then((courses) => setMyCourses(courses))
      .catch((err) => console.log(err));
  }, []);

  function removeCourse(id) {
    fetch(`${baseUrl}/myCourses/${id}`, {
      method: "DELETE",
    })
    handleDelete(id);
      /* .then(() => handleDelete(id))
      .catch((err) => console.log(err));  */
  }

  function handleDelete(id) {
    const updatedCourses = mycourses.filter((course) => course.id !== id);
    setMyCourses(updatedCourses);
  }
  console.log(mycourses);
  const courseArr = Object.values(mycourses);

  return (
    <div className="mycourses">
      <Navbar />
      <h1>My Courses</h1>
      <div
        className="card-container"
        onClick={(course) => removeCourse(course.id)}
      >
        {courseArr &&
          courseArr.map((course) => (
            <CourseCard
              key={course.id}
              image={course.image}
              title={course.title}
              description={course.description}
            />
          ))}
        <button
          className="delete-course"
          onClick={(course) => removeCourse(course.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default MyCourses;
