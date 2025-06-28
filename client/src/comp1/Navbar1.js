// src/components/Navbar.js

import React from 'react';
import './Navbar1.css';

function Navbar1() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">Hotel Booking</a>
      </div>
      <ul className="navbar-links">
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/">Logout</a></li>
      </ul>
    </nav>
  );
}

export default Navbar1;
