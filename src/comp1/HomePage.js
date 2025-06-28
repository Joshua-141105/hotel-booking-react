// src/components/HomePage.js

import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function HomePage() {
    const navigate = useNavigate();
    const [displayedText, setDisplayedText] = useState('');
    const fullText = "Weelcome to Our Hotel Booking System";
    const typingSpeed = 100; 

    const nav = (e) => {
        e.preventDefault();
        navigate("/list");
    }

    useEffect(() => {
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < fullText.length) {
                setDisplayedText((prev) => prev + fullText.charAt(index));
                index++;
            } else {
                clearInterval(typingInterval);
            }
        }, typingSpeed);

        return () => clearInterval(typingInterval); // Cleanup on unmount
    }, []);

    return (
        <div style={{ backgroundColor: 'black' }}>
            <Navbar />
            <div className="homepage">
                <center>
                    <section className="homepage-header">
                        <br />
                        <br />
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmeHH6jcIAytcvLjLIfQBiHe2UPbC_iCj1dA&s' width='200px' alt="" />
                        <h1>{displayedText}</h1>
                        <p>Find and book the perfect hotel for your next stay.</p>
                        <button className="explore-button" onClick={nav}>Explore Hotels</button>
                    </section>
                </center>
            </div>
        </div>
    );
}

export default HomePage;