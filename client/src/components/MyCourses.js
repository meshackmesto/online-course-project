import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import MyCourseCard from "./MyCourseCard";

function MyCourses() {
  const [mycourses, setMyCourses] = useState([]);
  const API = process.env.REACT_APP_SERVER_API;

  //return to fetch courses from api endpoint/ database
  useEffect(() => {
    fetch(`${API}/mycourses`)
      .then((response) => response.json())
      .then((courses) => setMyCourses(courses))
      .catch((err) => console.log("deleting course failed", err));
  }, []);

  function removeCourse(id) {
    fetch(`${API}/mycourses/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response error");
        }
        handleDelete(id);
      })
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
      <h2 className="heading">My Courses</h2>
      <div className="my-courses-cards-container">
        <div className="my-courses-cards">
          {mycourses &&
            mycourses.map((course) => (
              <MyCourseCard
                key={course.id}
                image={course.image}
                title={course.title}
                description={course.description}
                removeCourse={() => removeCourse(course.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default MyCourses;
