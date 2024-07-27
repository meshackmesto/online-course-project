import React, { useState, useEffect } from 'react';
import './AdminCourses.css'; 
import { useHistory } from "react-router-dom";

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetch('/courses')
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    const newCourse = { title, description };

    try {
      const response = await fetch('/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourse),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const courseData = await response.json();
      setCourses([...courses, courseData]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div className="admin-courses-container">
      {/* <div className="addcourse-form-container"> */}
        <form className="addcourses-form" onSubmit={handleAddCourse}>
            <h3>Add New Course</h3>
            <label>Course Title:</label>
            <input
              id= 'course-title'
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required />
            <label>Course Description:</label>
            <textarea
              id = "course-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required />
          <button type="submit">Add Course</button>
        </form>
      {/* </div> */}
      <div className="courses-list">
        <h2>Available Courses</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="admin-buttons">
        <button onClick={() => history.push('/reviews')}>Reviews</button>
        <button onClick={() => history.push('/course')}>Courses</button>
      </div>
    </div>
  );
}

export default AdminCourses;
