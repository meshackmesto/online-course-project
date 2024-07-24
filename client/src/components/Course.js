import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import CourseCard from "./CourseCard";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "./UserProvider";
import angularImage from "../assets/image/angular.jpg";

//import CoursePage from "./CoursePage";

function Course({ onAddCourse }) {
  const [courses, setCourses] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [myCourses, setMyCourses] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const { user } = useContext(UserContext);

  const history = useHistory();

  //fetch courses from db.json
  useEffect(() => {
    fetch("http://127.0.0.1:5555/courses")
      .then((response) => response.json())
      .then((coursesArray) => {
        setCourses(coursesArray);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/mycourses")
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
  function postCourse(e) {
    e.preventDefault();
    if (
      selectedCourse &&
      !myCourses.some((course) => course.id === selectedCourse.id)
    ) {
      fetch("http://127.0.0.1:5555/mycourses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //id: selectedCourse.id,
          /* image: selectedCourse.image, */
          title: selectedCourse.title,
          description: selectedCourse.description,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((newCourse) => {
          setMyCourses([...myCourses, newCourse]);
          setResponseMessage("Course added successfully to My Courses!");
          // alert("Course added successfully.");
          setSelectedCourse(null);
          setModal(false);
        })
        .catch((err) => console.log(err));
      setResponseMessage("Course added successfully to My Courses!");
    } else {
      setResponseMessage("Course already selected!");
    }
  }

  function handleLoggedIn() {
    if (user) {
      postCourse();
    } else {
      history.push("/login");
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
                {/*  <CourseCard
                  title={selectedCourse.title}
                  description={selectedCourse.description}
                /> */}

                <div className="course-image">
                  <img
                    className="angularImage"
                    src={angularImage}
                    alt="angular"
                  />
                </div>

                <div className="course-info">
                  <h3>{selectedCourse.title}</h3>
                  <p className="description">{selectedCourse.description}</p>
                  <p className="visit">Click this link to visit the course</p>
                  <a
                    className="link"
                    href="https://www.freecodecamp.org/learn/python-for-everybody/"
                  >
                    https://www.freecodecamp.org/learn/python-for-everybody/
                  </a>
                  <br />
                  <span className="duration"> Duration: 6 months</span>
                  <button
                    className="close-modal"
                    onClick={() => setModal(false)}
                  >
                    Close
                  </button>

                  <button className="select-course" onClick={postCourse}>
                    Register
                  </button>
                </div>
                {responseMessage && (
                  <p className="response">{responseMessage}</p>
                )}
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
            placeholder="search course"
          />
        </div>

        {/*check where error is coming from*/}
        <div className="course-container">
          <div className="cards">
            {displayedCourses &&
              displayedCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  /* image={course.image} */
                  description={course.description}
                  onClick={() => openCourse(course)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;
