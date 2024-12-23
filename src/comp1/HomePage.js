// src/components/HomePage.js

import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
function HomePage() {
    const navigate=useNavigate();
    const nav = (e) => {
        e.preventDefault();
        navigate("/list");
    }
  return (
    <div style={{backgroundColor : 'black'}}>
      <Navbar/>
    <div className="homepage">
      <center>
      <section className="homepage-header">
        <br></br>
        <br></br>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmeHH6jcIAytcvLjLIfQBiHe2UPbC_iCj1dA&s' width='200px'></img>
        <h1>Welcome to Our Hotel Booking System</h1>
        <p>Find and book the perfect hotel for your next stay.</p>
        <button className="explore-button" onClick={nav}>Explore Hotels</button>
      </section></center>
    </div>
    </div>
  );
}

export default HomePage;
