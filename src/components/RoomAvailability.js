import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RoomAvailability.css';
import Navbar from '../comp1/Navbar';

function RoomAvailability() {
  const { hotelID } = useParams();
  const [hotel, setHotel] = useState(null);
  const [roomsAvailable, setRoomsAvailable] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const hotelResponse = await fetch(`http://localhost:8080/hotels/${hotelID}`);
        const hotelData = await hotelResponse.json();
        setHotel(hotelData);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotelData();
  }, [hotelID]);

  const handleCheckAvailability = async (event) => {
    event.preventDefault();

    const checkinDate = new Date(event.target.checkin.value);
    const checkoutDate = new Date(event.target.checkout.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkinDate < today) {
      alert("Check-in Date must be greater than Today's Date.");
      return;
    }
    if (checkoutDate <= checkinDate) {
    alert("Check-out Date must be later than the Check-in Date.");
    return;
  }
    try {
      const roomResponse = await fetch(`http://localhost:8080/roomDetails/${hotelID}`);
      const roomDetails = await roomResponse.json();

      setRoomsAvailable(
        `Rooms Available: ${roomDetails.roomsAvailable}
        - Single: ${roomDetails.Single.count} ($${roomDetails.Single.price} per night)
        - Double: ${roomDetails.Double.count} ($${roomDetails.Double.price} per night)
        - Deluxe: ${roomDetails.Deluxe.count} ($${roomDetails.Deluxe.price} per night)`
      );

      navigate('/booking', { state: { hotel, roomDetails, checkinDate, checkoutDate } });
    } catch (error) {
      console.error("Error fetching room details:", error);
      alert("No room details found for this hotel.");
    }
  };

  return (
    <div style={{backgroundColor : 'black', height:'100vh'}}>
      <Navbar />
      <center>

      <div className="room-availability" style={{paddingLeft:'20px',alignItems : 'center'}}>
        {hotel && (
          <div style={{backgroundColor : 'white',width : '50%',height : '83vh',paddingTop:'30px'}}>
            <h2>{hotel.name}</h2>
            <img src={hotel.image} alt={hotel.name} />
            <p>Location: {hotel.location}</p>
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
            {roomsAvailable && <p className="room-details">{roomsAvailable}</p>}
          </div>
        )}
      </div>
      </center>
    </div>
  );
}

export default RoomAvailability;
