import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch('http://localhost:5555/students')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));
  };

  return (
    <div>
      <Navbar />
      <h1>Students</h1>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Student ID</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
              <tr key={student.id}>
               <td>{student.first_name}</td>
               <td>{student.last_name}</td>
               <td>{student.id}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;

