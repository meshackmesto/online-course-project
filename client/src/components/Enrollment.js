import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Enrollment() {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchEnrollments();
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchEnrollments = () => {
    fetch("/api/enrollments")
      .then((response) => response.json())
      .then((data) => setEnrollments(data))
      .catch((error) => console.error("Error fetching enrollments:", error));
  };

  const fetchStudents = () => {
    fetch("/api/students")
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching students:", error));
  };

  const fetchCourses = () => {
    fetch("/api/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  };

  return (
    <div>
      <Navbar />
      <h1>Enrollments</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th>Course Name</th>
            <th>Course ID</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enrollment) => {
            const student = students.find(
              (student) => student.id === enrollment.studentId
            );
            const course = courses.find(
              (course) => course.id === enrollment.courseId
            );
            return (
              <tr key={enrollment.id}>
                <td>{enrollment.id}</td>
                <td>{student ? student.name : "Unknown"}</td>
                <td>{course ? course.course_name : "Unknown"}</td>
                <td>{enrollment.courseId}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Enrollment;
