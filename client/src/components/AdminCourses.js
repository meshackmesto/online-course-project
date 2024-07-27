import React, { useState, useEffect } from 'react';
import './AdminCourses.css'; 

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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
    <><div className="admin-courses-container">
      <div className="form-container">
        <form onSubmit={handleAddCourse}>
          <div>
            <label>Course Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required />
          </div>
          <div>
            <label>Course Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required />
          </div>
          <button type="submit">Add Course</button>
        </form>
      </div>
    </div><div className="courses-list">
        <h2>All Courses</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </li>
          ))}
        </ul>
      </div></>

  );
}

export default AdminCourses;