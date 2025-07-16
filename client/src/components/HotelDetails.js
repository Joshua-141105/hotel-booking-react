import { useEffect, useState } from 'react';
import axios from 'axios';
import './HotelDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar1 from '../comp1/Navbar1';

function HotelDetails() {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    location: '',
    singleRooms: 0,
    doubleRooms: 0,
    deluxeRooms: 0,
  });

  const [loadingHotel, setLoadingHotel] = useState(true);
  const [hotelError, setHotelError] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [roomError, setRoomError] = useState(false);

  
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const hotelResponse = await axios.get(`${BASE_URL}/hotels/${hotelId}`);
        if (!hotelResponse.data || Object.keys(hotelResponse.data).length === 0) {
          setHotelError(true);
          setLoadingHotel(false);
          return;
        }

        const hotelData = hotelResponse.data;
        setHotel(hotelData);
        setLoadingHotel(false);

        const timeoutId = setTimeout(() => {
          setRoomError(true);
          setLoadingRooms(false);
        }, 5000);

        try {
          const roomResponse = await axios.get(`http://localhost:8080/roomDetails/${hotelId}`);
          clearTimeout(timeoutId);

          const roomDetails = roomResponse.data;
          setFormData({
            name: hotelData.name,
            image: hotelData.image,
            location: hotelData.location,
            singleRooms: roomDetails.Single?.count || 0,
            doubleRooms: roomDetails.Double?.count || 0,
            deluxeRooms: roomDetails.Deluxe?.count || 0,
          });
          setLoadingRooms(false);
        } catch {
          setRoomError(true);
          setLoadingRooms(false);
        }
      } catch {
        setHotelError(true);
        setLoadingHotel(false);
      }
    };

    fetchHotelData();
  }, [hotelId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const isRoomCountField = ['singleRooms', 'doubleRooms', 'deluxeRooms'].includes(name);
    setFormData({
      ...formData,
      [name]: isRoomCountField ? Math.max(0, parseInt(value, 10)) : value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/hotels/${hotelId}`, {
        name: formData.name,
        image: formData.image,
        location: formData.location,
      });

      await axios.put(`http://localhost:8080/roomDetails/${hotelId}`, {
        Single: { count: formData.singleRooms },
        Double: { count: formData.doubleRooms },
        Deluxe: { count: formData.deluxeRooms },
      });

      navigate('/admin');
    } catch (error) {
      console.error("Error updating hotel data:", error);
      alert("Failed to update hotel. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;

    try {
      await axios.delete(`http://localhost:8080/hotels/${hotelId}`);
      await axios.delete(`http://localhost:8080/roomDetails/${hotelId}`);
      navigate('/admin-reviews');
    } catch (error) {
      console.error("Error deleting hotel:", error);
      alert("Failed to delete hotel.");
    }
  };

  if (loadingHotel) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Loading hotel details...</p>
      </div>
    );
  }

  if (hotelError) {
    return (
      <div className="loading-container">
        <p style={{ color: 'red' }}>❌ Error fetching hotel details. Hotel may not exist.</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'black' }}>
      <Navbar1 />
      <br />
      <div className="container">
        <div>
          <h2>Hotel Details</h2>
          <img src={hotel.image} alt={hotel.name} style={{ width: '100%', height: 'auto' }} />
          <h2>{hotel.name}</h2>
          <p>Location: {hotel.location}</p>
          <h3>Room Details</h3>

          {loadingRooms && !roomError && (
            <div className="loading-container">
              <div className="spinner" />
              <p>Loading room details...</p>
            </div>
          )}

          {roomError && (
            <p style={{ color: 'red' }}>❌ Error fetching room details. Please try again later.</p>
          )}

          {!loadingRooms && !roomError && (
            <>
              <p>Single Rooms: {formData.singleRooms}</p>
              <p>Double Rooms: {formData.doubleRooms}</p>
              <p>Deluxe Rooms: {formData.deluxeRooms}</p>
            </>
          )}
        </div>

        <form onSubmit={handleUpdate}>
          <center>
            <h3>Update Hotel</h3>
            <br />
            <div className="form-group">
              <label>Hotel Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Hotel Image URL:</label>
              <input type="text" name="image" value={formData.image} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Hotel Location:</label>
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Number of Single Rooms:</label>
              <input type="number" name="singleRooms" min="0" value={formData.singleRooms} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Number of Double Rooms:</label>
              <input type="number" name="doubleRooms" min="0" value={formData.doubleRooms} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Number of Deluxe Rooms:</label>
              <input type="number" name="deluxeRooms" min="0" value={formData.deluxeRooms} onChange={handleInputChange} required />
            </div>
          </center>
          <br />
          <button type="submit">Update Hotel</button>
          <br />
          <button type="button" onClick={handleDelete} style={{ marginTop: '10px', backgroundColor: 'red', color: 'white' }}>
            Delete Hotel
          </button>
        </form>
      </div>
      <br /><br />
    </div>
  );
}

export default HotelDetails;
