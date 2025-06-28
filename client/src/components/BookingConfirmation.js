import React, { useState } from 'react';
import './BookingConfirmation.css';
import { useLocation } from 'react-router-dom';
import UserReviews from './UserReviews';
import Navbar from '../comp1/Navbar';
import { Button } from '@mui/material';
import axios from 'axios';

function BookingConfirmation() {
  const location = useLocation();
  const {
    hotel,
    roomDetails = {},
    selectedRooms = {},
    checkinDate,
    checkoutDate,
    paymentMethod,
  } = location.state || {};

  const [userRating, setUserRating] = useState(hotel?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState(null);
  
  const totalAmount = Object.keys(selectedRooms).reduce((total, roomType) => {
    const price = roomDetails[roomType]?.price || 0;
    return total + (price * selectedRooms[roomType]);
  }, 0);

  const handleStarClick = (ratingValue) => {
    setUserRating(ratingValue);
    setMessage("Thank You for your feedback!!!");
  };

  const handleStarMouseEnter = (ratingValue) => {
    setHoverRating(ratingValue);
  };

  const handleStarMouseLeave = () => {
    setHoverRating(0);
  };

 const handleBooking = async () => {
  try {
    // Fetch existing room details from the database
    const roomDetailsResponse = await axios.get(`http://localhost:8080/roomDetails/${hotel.id}`);
    const existingRoomDetails = roomDetailsResponse.data;

    const roomUpdatePromises = Object.keys(selectedRooms).map(async (roomType) => {
      if (selectedRooms[roomType] > 0) {
        const roomDetail = existingRoomDetails[roomType];
        const updatedCount = roomDetail.count - selectedRooms[roomType];

        // Update the count for the specific room type
        existingRoomDetails[roomType].count = updatedCount;

        // Check if all rooms of this type are booked
        if (updatedCount <= 0) {
          // Set hotel availability to false
          await axios.put(`http://localhost:8080/hotels/${hotel.id}`, {
            available: false,
          });
        }
      }
    });

    // Send the complete room details back to the database
    await Promise.all(roomUpdatePromises);
    await axios.put(`http://localhost:8080/roomDetails/${hotel.id}`, existingRoomDetails);
    
    alert("Rooms booked successfully!");

  } catch (error) {
    console.error("Error updating room details:", error);
    alert("There was an error processing your booking.");
  }
};

  return (
    <div>
      <Navbar />
      <div className="booking-confirmation-container">
        <div className="booking-confirmation">
          <h2>Booking Confirmation</h2>
          <p>Thank you for your booking!!!!</p>
          <p><b>Hotel Name:</b> {hotel?.name}</p>
          <p><b>Location:</b> {hotel?.location}</p>
          <p><b>Check-In Date:</b> {new Date(checkinDate).toLocaleDateString()}</p>
          <p><b>Check-Out Date:</b> {new Date(checkoutDate).toLocaleDateString()}</p>
          <h2>Room Details</h2>
          {Object.keys(selectedRooms).map((roomType) => (
            selectedRooms[roomType] > 0 && (
              <p key={roomType}>
                <b>{roomType} Rooms:</b> {selectedRooms[roomType]} (Price: ${roomDetails[roomType]?.price || 0} per night)
              </p>
            )
          ))}
          <p><b>Total Rooms Booked:</b> {Object.values(selectedRooms).reduce((sum, count) => sum + count, 0)}</p>
          <p><b>Total Amount:</b> ${totalAmount.toFixed(2)}</p>
          <p><b>Payment Method: </b> {paymentMethod}</p>
          <Button variant="contained" color="primary" onClick={handleBooking}>
            Confirm Booking
          </Button>
          <Button variant="contained" color="primary" onClick={() => {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
              <html>
              <head>
                <title>Booking Confirmation</title>
                <style>
                  body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f9f9f9;
                    padding: 40px;
                    color: #333;
                    align-items: center;
                  }
                  .container {
                    align-items: center;
                    background-color: #ffffff;
                    border-radius: 10px;
                    padding: 30px 40px;
                    max-width: 600px;
                    margin: auto;
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                  }
                  h2 {
                    text-align: center;
                    color: #2c3e50;
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 10px;
                    margin-bottom: 30px;
                  }
                  p {
                    font-size: 16px;
                    margin: 10px 0;
                    line-height: 1.6;
                  }
                  b {
                    color: #2c3e50;
                  }
                  .total {
                    font-size: 18px;
                    font-weight: bold;
                    margin-top: 30px;
                    padding-top: 10px;
                    border-top: 1px solid #ccc;
                    color: #e67e22;
                  }
                  .footer {
                    text-align: center;
                    font-size: 13px;
                    color: #888;
                    margin-top: 40px;
                  }
                </style>
              </head>
              <body>
                <center>
                  <div class="container">
                    <h2>Booking Confirmation</h2>
                    <p>Thank you for your booking!!!!</p>
                    <p><b>Hotel Name:</b> ${hotel?.name}</p>
                    <p><b>Location:</b> ${hotel?.location}</p>
                    <p><b>Check-In Date:</b> ${new Date(checkinDate).toLocaleDateString()}</p>
                    <p><b>Check-Out Date:</b> ${new Date(checkoutDate).toLocaleDateString()}</p>
                    <p><b>Total Rooms Booked:</b> ${Object.values(selectedRooms).reduce((sum, count) => sum + count, 0)}</p>
                    <p class="total"><b>Total Amount:</b> $${totalAmount.toFixed(2)}</p>
                    <div class="footer">Powered by HotelReservationSystem.com</div>
                  </div>
                </center>
              </body>
              </html>
            `);
            printWindow.document.close();
            printWindow.print();
          }}>
            Print Confirmation
          </Button>
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