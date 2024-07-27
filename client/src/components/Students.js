import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

function Students() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch('http://localhost:5555/students')
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));
  };

  function filterStudents(e) {
    const input = e.target.value;
    setSearch(input);

    const filtered = students.filter(
      (student) =>
        student.first_name.toLowerCase().includes(input.toLowerCase()) ||
        student.last_name.includes(input.toLowerCase())
    );
    setFilteredStudents(filtered);
  }

  const displayedStudents = search.length > 0 ? filteredStudents : students;

  return (
    <div>
      <Navbar />
      <h2>Students</h2>

      <div className="search_bar">
        <input
          className="search"
          type="text"
          value={search}
          onChange={filterStudents}
          placeholder="search student"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Student ID</th>
          </tr>
        </thead>
        <tbody>
        {displayedStudents &&
        displayedStudents.map((student) => (
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

