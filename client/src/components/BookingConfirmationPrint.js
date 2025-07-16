import React from 'react';
import './BookingConfirmationPrint.css';

const BookingConfirmationPrint = React.forwardRef(({
  hotel,
  checkinDate,
  checkoutDate,
  selectedRooms,
  roomDetails,
  paymentMethod,
  totalAmount
}, ref) => {
  const formattedCheckinDate = checkinDate ? new Date(checkinDate).toLocaleDateString() : '';
  const formattedCheckoutDate = checkoutDate ? new Date(checkoutDate).toLocaleDateString() : '';
  const totalRooms = Object.values(selectedRooms || {}).reduce((sum, count) => sum + count, 0);

  return (
    <div ref={ref} className="booking-confirmation-print">
      <h2>Booking Confirmation</h2>
      <p>Thank you for your booking!</p>
      <p><b>Hotel Name:</b> {hotel?.name}</p>
      <p><b>Location:</b> {hotel?.location}</p>
      <p><b>Check-In Date:</b> {formattedCheckinDate}</p>
      <p><b>Check-Out Date:</b> {formattedCheckoutDate}</p>
      <p><b>Total Rooms Booked:</b> {totalRooms}</p>
      <p><b>Room Details:</b></p>
      <ul>
        {Object.keys(selectedRooms || {}).map((roomType) => (
          selectedRooms[roomType] > 0 && (
            <li key={roomType}>
              {roomType} Rooms: {selectedRooms[roomType]} (Price: ${roomDetails?.[roomType]?.price || 0})
            </li>
          )
        ))}
      </ul>
      <p><b>Payment Method:</b> {paymentMethod}</p>
      <p><b>Total Amount:</b> ${totalAmount.toFixed(2)}</p>
    </div>
  );
});

export default BookingConfirmationPrint;  