import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSelectionPage.css';

function LoginSelectionPage() {
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    navigate('/guest-login');
  };

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  return (
    <div className="login-selection-page">
      <div className="a1">
        <h2>Hotel Reservation System</h2>
        <div className="login-buttons">
          <button onClick={handleGuestLogin} className="guest-login-button">
            Guest Login
          </button>
          <button onClick={handleAdminLogin} className="admin-login-button">
            Hotel Admin Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginSelectionPage;
