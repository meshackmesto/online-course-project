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

  const toggleModal = () => {
    setModal(!modal);
  };

  const openCourse = (course) => {
    setSelectedCourse(course);
    toggleModal();
  };

  useEffect(() => {
    const baseUrl = "http://localhost:3031";
    fetch(`${baseUrl}/courses`)
      .then((response) => response.json())
      .then((coursesArray) => {
        setCourses(coursesArray);
      })
      .catch((err) => console.log(err));
  }, []);

  const coursesArr = Object.values(courses);

  function filterCourses(e) {
    const input = e.target.value;
    setSearch(input);

    const filtered = coursesArr.filter(
      (course) =>
        course.title.toLowerCase().includes(input.toLowerCase()) ||
        course.description.includes(input.toLowerCase())
    );
    setFilteredCourses(filtered);
  }
  console.log(filteredCourses);

  const displayedCourses = search.length > 0 ? filteredCourses : courses;

  const baseUrl = "http://localhost:3031";
  function postCourse(e) {
    e.preventDefault();
    fetch(`${baseUrl}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: selectedCourse.title,
        description: selectedCourse.description,
      }),
    })
      .then((response) => response.json())
      .then((newCourse) => {
        onAddCourse(newCourse);
        toggleModal();
      });
  }

  return (
    <div className="courses">
      <Navbar />

      {modal && (
        <div className="modal">
          <div className="overlay" onClick={toggleModal}></div>
          <div className="modal-content">
            <h2>{selectedCourse.title}</h2>
            <p>{selectedCourse.description}</p>
            <button className="close-modal" onClick={toggleModal}>
              Close
            </button>
            <button className="select-course" onClick={postCourse}>
              Select Course
            </button>
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
        <div className="course-container">
          {displayedCourses &&
            displayedCourses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.description}
                onClick={() =>
                  openCourse({
                    title: course.title,
                    description: course.description,
                  })
                }
                onAddCourse={onAddCourse}
              />
            ))}
        </div>
        {/* <CourseCard
          title="Web Development"
          description="The world of web development is as wide as the internet itself. Much of our social and vocational lives play out on the internet, which prompts new industries aimed at creating, managing, and debugging the websites and applications that we increasingly rely on."
          onClick={() =>
            openCourse({
              title: "Web Development",
              description:
                "The world of web development is as wide as the internet itself. Much of our social and vocational lives play out on the internet, which prompts new industries aimed at creating, managing, and debugging the websites and applications that we increasingly rely on.",
            })
          }
          onAddCourse={onAddCourse}
        />
        <CourseCard
          title="Data Science"
          description="Data science application is an in-demand skill in many industries worldwide — including finance, transportation, education, manufacturing, human resources, and banking. Explore data science courses with Python, statistics, machine learning, and more to grow your knowledge. "
          onClick={() =>
            openCourse({
              title: "Data Science",
              description:
                "Data science application is an in-demand skill in many industries worldwide — including finance, transportation, education, manufacturing, human resources, and banking. Explore data science courses with Python, statistics, machine learning, and more to grow your knowledge.",
            })
          }
          onAddCourse={onAddCourse}
        />
        <CourseCard
          title="Statistics"
          description="Study how to  study and manipulation of data, including ways to gather, review, analyze, and draw conclusions from data."
          onClick={() =>
            openCourse({
              title: "Statistics",
              description:
                "Study how to  study and manipulation of data, including ways to gather, review, analyze, and draw conclusions from data",
            })
          }
          onAddCourse={onAddCourse}
        />
        <CourseCard
          title="Python"
          description="Learn Python. Learn how to code using this incredibly useful language. Its simple syntax and readability makes Python perfect for Flask, Django, data science, and machine learning."
          onClick={() =>
            openCourse({
              title: "Python",
              description:
                "Learn Python. Learn how to code using this incredibly useful language. Its simple syntax and readability makes Python perfect for Flask, Django, data science, and machine learning.",
            })
          }
          onAddCourse={onAddCourse}
        />

        <CourseCard
          title="Machine Learning"
          description="Learn machine learning. Machine learning is an area of study that gives us the ability to use data to make better and smarter decisions."
          onClick={() =>
            openCourse({
              title: "Machine Learning",
              description:
                "Learn machine learning. Machine learning is an area of study that gives us the ability to use data to make better and smarter decisions.",
            })
          }
          onAddCourse={onAddCourse}
        />

        <CourseCard
          title="Excel"
          description="Learn how to use this industry-standard software. Real-world experts will show you the basics like how to organize data into sheets, rows and columns, and advanced techniques."
          onClick={() =>
            openCourse({
              title: "Excel",
              description:
                "Learn how to use this industry-standard software. Real-world experts will show you the basics like how to organize data into sheets, rows and columns, and advanced techniques.",
            })
          }
          onAddCourse={onAddCourse}
        /> */}
      </div>
      {/* {modal && <button className="close-modal" onClick={toggleModal}>Close</button>} */}
    </div>
  );
}

export default Course;
