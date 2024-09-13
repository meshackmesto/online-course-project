import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar";
import CourseCard from "./CourseCard";
import { useHistory } from "react-router-dom";
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
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    image: "",
  });

  const API = process.env.REACT_APP_SERVER_API;

  const history = useHistory();

  //fetch courses from db.json
  useEffect(() => {
    fetch(`${API}courses`)
      .then((response) => response.json())
      .then((coursesArray) => {
        setCourses(coursesArray);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`${API}/mycourses`)
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
      fetch(`${API}/mycourses`, {
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

  function addCourse(e) {
    e.preventDefault();
    fetch(`${API}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCourse),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((addedCourse) => {
        setCourses([...courses, addedCourse]);
        setResponseMessage("Course added successfully!");
        setNewCourse({
          title: "",
          description: "",
          image: "",
        });
      })
      .catch((err) => {
        console.error(err);
        setResponseMessage("Failed to add course.");
      });
  }

  function handleLoggedIn() {
    if (user) {
      if (user.isAdmin) {
        history.push("/admin");
      } else {
        history.push("/login");
      }
    } else {
      history.push("/login");
    }
  }

  return (
    <div className="courses">
      <Navbar />

      {user && user.isAdmin && (
        <div className="admin-add-course">
          <h2>Add New Course</h2>
          <form onSubmit={addCourse}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={newCourse.title}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, title: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={newCourse.description}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, description: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Image URL:</label>
              <input
                type="text"
                value={newCourse.image}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, image: e.target.value })
                }
              />
            </div>
            <button type="submit" onClick={handleLoggedIn} className="add-btn">
              Add Course
            </button>

            {responseMessage && <p>{responseMessage}</p>}
          </form>
        </div>
      )}

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
