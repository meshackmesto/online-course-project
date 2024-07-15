import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import CourseCard from "./CourseCard";

//import CoursePage from "./CoursePage";

function Course({ onAddCourse }) {
  const [courses, setCourses] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [myCourses, setMyCourses] = useState([]);

  //fetch courses from db.json
  useEffect(() => {
    const baseUrl = "http://localhost:5555";
    fetch(`${baseUrl}/courses`)
      .then((response) => response.json())
      .then((coursesArray) => {
        setCourses(coursesArray);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const baseUrl = "http://localhost:5555";
    fetch(`${baseUrl}/myCourses`)
      .then((response) => response.json())
      .then((coursesArray) => {
        setMyCourses(coursesArray);
      })
      .catch((err) => console.log(err));
  }, []);

  //filter out courses by the search input value
  function filterCourses(e) {
    const input = e.target.value;
    setSearch(input);

    const filtered = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(input.toLowerCase()) ||
        course.description.includes(input.toLowerCase())
    );
    setFilteredCourses(filtered);
  }

  const openCourse = (course) => {
    setSelectedCourse(course);
    setModal(true);
  };
  //toggles between display all courses and the searched course
  const displayedCourses = search.length > 0 ? filteredCourses : courses;

  //add course to db.json myCourses
  const baseUrl = "http://localhost:5555";
  function postCourse(e) {
    e.preventDefault();
    if (
      selectedCourse &&
      !myCourses.some((course) => course.id === selectedCourse.id)
    ) {
      fetch(`${baseUrl}/myCourses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedCourse.id,
          /* image: selectedCourse.image, */
          title: selectedCourse.title,
          description: selectedCourse.description,
        }),
      })
        .then((response) => response.json())
        .then((newCourse) => {
          setMyCourses([...myCourses, newCourse]);
          setSelectedCourse(null);
          setModal(false);
        })
        .catch((err) => console.log(err));
    } else {
      alert("Course already selected");
    }
  }

  return (
    <div className="courses">
      <Navbar />

      {modal && (
        <div className="modal">
          <div className="overlay" onClick={() => setModal(false)}></div>
          <div className="modal-content">
            {selectedCourse && (
              <>
                <CourseCard
                  /* image={selectedCourse.image}
              alt={selectedCourse.title} */
                  title={selectedCourse.title}
                  description={selectedCourse.description}
                />
                <button className="close-modal" onClick={() => setModal(false)}>
                  Close
                </button>

                <button className="select-course" onClick={postCourse}>
                  Select Course
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <div>
        <div className="search_bar">
          <input
            className="search"
            type="text"
            value={search}
            onChange={filterCourses}
            placeholder="search courses"
          />
        </div>

        {/*check where error is coming from*/}
        <div className="course-container">
          {displayedCourses &&
            displayedCourses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                image={course.image}
                description={course.description}
                onClick={() =>
                  openCourse(
                    course /* {
                    image: course.image,
                    title: course.title,
                    description: course.description,
                  } */
                  )
                }
  
              />
            ))}
        </div>

      </div>
    </div>
  );
}

export default Course;
