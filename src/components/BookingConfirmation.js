// BookingConfirmation.js
import React, { useState } from 'react';
import './BookingConfirmation.css';
import { useLocation } from 'react-router-dom';
import UserReviews from './UserReviews';
import Navbar from '../comp1/Navbar';
import { Button } from '@mui/material';

function BookingConfirmation() {
  const location = useLocation();
  const {
    hotel,
    roomDetails = {},
    selectedRooms = {},
    checkinDate,
    checkoutDate,
    paymentMethod = 'Card',
  } = location.state || {};

  const [userRating, setUserRating] = useState(hotel?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message,setMessage] = useState(null);
  const formattedCheckinDate = checkinDate ? new Date(checkinDate).toISOString().split('T')[0] : '';
  const formattedCheckoutDate = checkoutDate ? new Date(checkoutDate).toISOString().split('T')[0] : '';

  const totalRoomsBooked = Object.values(selectedRooms).reduce((sum, count) => sum + count, 0);

  const handleStarClick = (ratingValue) => {
    setUserRating(ratingValue);
    setMessage("Thank You for your feedback!!!");
    // You can add additional logic here to save the rating to a database or API
  };

  const handleStarMouseEnter = (ratingValue) => {
    setHoverRating(ratingValue);
  };

  const handleStarMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div>
      <Navbar />
      <div className="booking-confirmation-container">
        <div className="booking-confirmation">
          <h2>Booking Confirmation</h2>
          <p>Thank you for your booking!!!!</p>
          <p>
            <b>Confirmation Number:</b> XYZ123
          </p>
          <p>
            <b>Hotel Name:</b> {hotel?.name}
          </p>
          <p>
            <b>Location:</b> {hotel?.location}
          </p>
          <p>
            <b>Check-In Date:</b> {formattedCheckinDate}
          </p>
          <p>
            <b>Check-Out Date:</b> {formattedCheckoutDate}
          </p>
          <p>
            <b>Total Rooms Booked:</b> {totalRoomsBooked}
          </p>
          <p>
            <b>Room Details:</b>
            <li>Single Rooms: {selectedRooms.Single} ( Price: ${roomDetails?.Single?.price || 0} )</li>
            <li>Double Rooms: {selectedRooms.Double} ( Price: ${roomDetails?.Double?.price || 0} )</li>
            <li>Deluxe Rooms: {selectedRooms.Deluxe} ( Price: ${roomDetails?.Deluxe?.price || 0} )</li>
          </p>
          <p>
            <b>Payment Method:</b> {paymentMethod}
          </p>
          <center>
            <Button variant="contained" color="primary" onClick={() => window.print()} style={{"marginRight":'37.5%'}}>
              Print Confirmation
            </Button>
          </center>
        </div>

        <div className="hotel-image-container">
          <img src={hotel?.image} alt={`${hotel?.name}`} className="hotel-image" />
          <div className="star-rating">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <span
                  key={index}
                  className={
                    ratingValue <= (hoverRating || userRating)
                      ? "star filled"
                      : "star"
                  }
                  onClick={() => handleStarClick(ratingValue)}
                  onMouseEnter={() => handleStarMouseEnter(ratingValue)}
                  onMouseLeave={handleStarMouseLeave}
                >
                  &#9733;
                </span>
              );
            })}
          </div>
          <p>{message && <UserReviews />}</p>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;
