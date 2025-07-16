import React from 'react';
import './AdminLogin.css';
import LoginPage from './LoginPage 1';

function AdminLogin() {
  return (
    <div className="admin-login-page">
      
      <h2>Hotel Admin Login</h2>
      <LoginPage />
      {/* Admin login form can be added here */}
    </div>
  );
}

export default AdminLogin;
