// BookingForm.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingForm.css';
import Navbar from '../comp1/Navbar';

function BookingForm() {
  const location = useLocation();
  const { hotel, roomDetails = {}, checkinDate, checkoutDate } = location.state || {};
  const navigate = useNavigate();

  const formattedCheckinDate = checkinDate ? checkinDate.toISOString().split('T')[0] : '';
  const formattedCheckoutDate = checkoutDate ? checkoutDate.toISOString().split('T')[0] : '';

  const [selectedRooms, setSelectedRooms] = useState({
    Single: 0,
    Double: 0,
    Deluxe: 0,
  });

  const [paymentMethod, setPaymentMethod] = useState('Card');

  const handleRoomChange = (type, count) => {
    setSelectedRooms((prev) => ({
      ...prev,
      [type]: count,
    }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(totalAmount===0)
    {
      alert('Book at least 1 room!!!');
      return;
    }
    navigate('/confirm', { 
      state: { 
        hotel, 
        roomDetails, 
        selectedRooms, // Passing selected rooms here
        checkinDate, 
        checkoutDate, 
        paymentMethod 
      } 
    });
  };

  const calculateTotal = () => {
    const totalDays = checkinDate && checkoutDate ? Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)) : 0;
    const singleTotal = selectedRooms.Single * (roomDetails.Single?.price || 0) * totalDays;
    const doubleTotal = selectedRooms.Double * (roomDetails.Double?.price || 0) * totalDays;
    const deluxeTotal = selectedRooms.Deluxe * (roomDetails.Deluxe?.price || 0) * totalDays;

    return singleTotal + doubleTotal + deluxeTotal;
  };

  const totalAmount = calculateTotal();

  return (
    <div style={{ backgroundColor: 'white' }}>
    <Navbar />
    <center>
        <div className="booking-form-container" style={{ paddingLeft: '20%'}}>
            <div className="booking-form" style={{ border : '3px solid rgb(247,14,14)',boxShadow : '0 0 20px rgba(255, 0, 0, 0.67), 0 0 30px rgba(255, 217, 0, 0.8)'}}>
                <h2>Book a Room at {hotel?.name}</h2>
                <form onSubmit={handleSubmit}>
                    <p>
                        <b>Rooms Available: </b>{roomDetails?.roomsAvailable || 'N/A'}
                        <br /><br />
                        <b>Single: </b>{roomDetails?.Single?.count || 0} (${roomDetails?.Single?.price || 0} per night)
                        <br /><br />
                        <b>Double: </b>{roomDetails?.Double?.count || 0} (${roomDetails?.Double?.price || 0} per night)
                        <br /><br />
                        <b>Deluxe: </b>{roomDetails?.Deluxe?.count || 0} (${roomDetails?.Deluxe?.price || 0} per night)
                    </p>
                    <label>
                        Location:
                        <input type="text" name="location" value={hotel?.location || ''} disabled />
                    </label>
                    <label>
                        Check-In Date:
                        <input type="date" value={formattedCheckinDate} disabled />
                    </label>
                    <label>
                        Check-Out Date:
                        <input type="date" value={formattedCheckoutDate} disabled />
                    </label>
                    <label>Single Rooms:
                        <input
                            type="number"
                            value={selectedRooms.Single}
                            onChange={(e) => handleRoomChange('Single', parseInt(e.target.value) || 0)}
                            min="0"
                            max={roomDetails?.Single?.count || 0}
                        />
                    </label>
                    <label>Double Rooms:
                        <input
                            type="number"
                            value={selectedRooms.Double}
                            onChange={(e) => handleRoomChange('Double', parseInt(e.target.value) || 0)}
                            min="0"
                            max={roomDetails?.Double?.count || 0}
                        />
                    </label>
                    <label>Deluxe Rooms:
                        <input
                            type="number"
                            value={selectedRooms.Deluxe}
                            onChange={(e) => handleRoomChange('Deluxe', parseInt(e.target.value) || 0)}
                            min="0"
                            max={roomDetails?.Deluxe?.count || 0}
                        />
                    </label>
                    <label>
                        Total Amount:
                        <input
                            type="number"
                            value={totalAmount}
                            disabled
                        />
                    </label>
                    <label>
                        Name:
                        <input type="text" name="name" required />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" required />
                    </label>
                    <label>
                        Payment Method:
                        <select value={paymentMethod} onChange={handlePaymentChange} required>
                            <option value="Card">Card</option>
                            <option value="UPI">UPI</option>
                            <option value="Netbanking">Netbanking</option>
                        </select>
                    </label>
                    <button type="submit">Confirm Booking</button>
                </form>
                <br/>
            </div>
            <div className="hotel-info" style={{paddingLeft : '4%'}}>
                <img src={hotel?.image} alt={`${hotel?.name}`} className="hotel-image" />
                <br/>
                <br/>
                <img src='https://static.theprint.in/wp-content/uploads/2022/10/Hotel.jpg' alt={`${hotel?.name}`} className="hotel-image" />
                <h3>Reviews</h3>
                <ul className="reviews-list">
                    {hotel?.reviews?.map((review, index) => (
                        <li key={index} className="review-item">
                            <p><b>{review.author}:</b> {review.comment}</p>
                        </li>
                    )) || <p>No reviews available.</p>}
                </ul>
            </div>
        </div>
    </center>
</div>
  );
}

export default BookingForm;
