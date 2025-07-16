import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HotelListings.css';
import Navbar from '../comp1/Navbar';

function HotelListings() {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(`${BASE_URL}/hotels`);
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    fetchHotels();
  }, []);

  const handleHotelClick = (id, available) => {
    if (available) {
      navigate(`/room-availability/${id}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="hotel-listings">
        <h1>Hotel Listings</h1>
        <ul>
          {hotels.map(hotel => (
            <li
              key={hotel.id}
              className={`hotel-card ${hotel.available ? 'available' : 'unavailable'}`}
              onClick={() => handleHotelClick(hotel.id, hotel.available)}
            >
              <img
                src={hotel.image}
                alt={hotel.name}
                className="hotel-image"
              />
              <span className={`status-badge ${hotel.available ? 'green' : 'red'}`}>
                {hotel.available ? 'Available' : 'Unavailable'}
              </span>
              <h3>{hotel.name}</h3>
              <p>Location: {hotel.location}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HotelListings;
