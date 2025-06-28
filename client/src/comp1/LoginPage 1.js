import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage 1.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Fetch users from db.json
      const response = await fetch('http://localhost:8080/admins');
      const admin = await response.json();

      // Check if an admin user with the provided username and password exists
      const user = admin.find(user => user.username === username && user.password === password);

      if (user) {
        navigate('/admin'); // Redirect to admin page
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="login-page" style={{ backgroundColor: 'black' }}>
      <div className="login-container">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Login</button>
          </form>
        </div>
        <div
          className="login-image"
          style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s')" }}
        />
      </div>
    </div>
  );
}

export default LoginPage;
