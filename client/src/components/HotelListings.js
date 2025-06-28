import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HotelListings.css';
import Navbar from '../comp1/Navbar';

function HotelListings() {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch hotels from db.json
    const fetchHotels = async () => {
      try {
        const response = await fetch('http://localhost:8080/hotels');
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  const handleHotelClick = (id) => {
    navigate(`/room-availability/${id}`);
  };

  return (
    <div>
      <Navbar />
      <div className="hotel-listings">
        <h1>Hotel Listings</h1>
        <ul>
          {hotels.map(hotel => (
            <li key={hotel.id}>
              <img src={hotel.image} alt={hotel.name} className="hotel-image" onClick={() => handleHotelClick(hotel.id)} />
              <h3 onClick={() => handleHotelClick(hotel.id)}>{hotel.name}</h3>
              <p>Location: {hotel.location}</p>
              {!hotel.available && <p>Rooms unavailable</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HotelListings;
