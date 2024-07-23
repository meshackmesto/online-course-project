import React, { useState } from 'react';
import './AdminRegistrationForm.css';
import Navbar from './Navbar';

function AdminRegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/admin_signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw new Error('Failed to register admin');
      })
      .then((data) => {
        console.log('Admin registered:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <h2>Admin Registration</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit">Register Admin</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminRegistrationForm;
