import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RoomAvailability.css';
import Navbar from '../comp1/Navbar';

function RoomAvailability() {
  const { hotelID } = useParams();
  const [hotel, setHotel] = useState(null);
  const [roomsAvailable, setRoomsAvailable] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  
  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/hotels/${hotelID}`);
        const data = await response.json();
        setHotel(data);
      } catch (error) {
        console.error('Error fetching hotel:', error);
      }
    };

    fetchHotelData();
  }, [hotelID]);

  const handleCheckAvailability = async (e) => {
    e.preventDefault();
    const checkinDate = new Date(e.target.checkin.value);
    const checkoutDate = new Date(e.target.checkout.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkinDate < today) {
      setErrorMessage("❌ Check-in Date must be in the future.");
      return;
    }
    if (checkoutDate <= checkinDate) {
      setErrorMessage("❌ Check-out Date must be after Check-in Date.");
      return;
    }

    setErrorMessage(''); // Clear old messages

    try {
      const roomResponse = await fetch(`${BASE_URL}/roomDetails/${hotelID}`);
      const roomDetails = await roomResponse.json();

      if (!roomDetails || Object.keys(roomDetails).length === 0) {
        setErrorMessage("❌ No room details found.");
        return;
      }

      const details = `
✔ Available:
- Single: ${roomDetails.Single?.count || 0} ($${roomDetails.Single?.price || 0})
- Double: ${roomDetails.Double?.count || 0} ($${roomDetails.Double?.price || 0})
- Deluxe: ${roomDetails.Deluxe?.count || 0} ($${roomDetails.Deluxe?.price || 0})
      `;
      setRoomsAvailable(details);

      setTimeout(() => {
        navigate('/booking', {
          state: { hotel, roomDetails, checkinDate, checkoutDate }
        });
      }, 1000);
    } catch (error) {
      console.error("Room fetch error:", error);
      setErrorMessage("❌ Error fetching room details.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="room-availability">
        {hotel && (
          <div style={{
            width: '46%',
            padding: '30px',
            backgroundColor: 'rgba(247,14,14,0.79)',
            borderRadius: '8px',
            boxShadow: '0 0 20px rgba(51, 255, 0, 0.8), 0 0 30px rgba(255, 115, 0, 0.6)',
          }}>
            <h2>{hotel.name}</h2>
            <img src={hotel.image} alt={hotel.name} />
            <p><b>Location:</b> {hotel.location}</p>
            <form onSubmit={handleCheckAvailability}>
              <label>
                Check-in Date:
                <input type="date" name="checkin" required />
              </label>
              <label>
                Check-out Date:
                <input type="date" name="checkout" required />
              </label>
              <button type="submit">Check Availability</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {roomsAvailable && <pre className="room-details">{roomsAvailable}</pre>}
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomAvailability;
