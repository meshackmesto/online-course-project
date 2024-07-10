import React, { useEffect, useState } from "react";
import Course from "./Course";
import MyCourses from "./MyCourses";

function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  //remove baseUrl when fetching from db
  useEffect(() => {
    const baseUrl = "http://localhost:3031";
    fetch(`${baseUrl}/courses`)
      .then((response) => response.json())
      .then((coursesArray) => {
        console.log(coursesArray);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleAddCourse(newCourse) {
    const updatedCourses = [...selectedCourses, newCourse];
    setSelectedCourses(updatedCourses);
  }

  /*  const displayedCourses = courses.map((course) => {
    return <Course key={course.id} course={course} />;
  }); */

  return (
    <div className="coursepage">
      <Course onAddCourse={handleAddCourse} courses={courses} />
      <MyCourses displayedCourses={selectedCourses} />
    </div>
  );
}

export default CoursePage;
