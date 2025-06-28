// src/components/Navbar.js

import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">Hotel Booking</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/home">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/">Logout</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
