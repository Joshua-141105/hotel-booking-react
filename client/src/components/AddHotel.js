import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddHotel.css';
import Navbar1 from '../comp1/Navbar1';

function AddHotel() {
  const navigate = useNavigate(); // Using useNavigate instead of useHistory
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    location: '',
    singleRooms: 0,
    doubleRooms: 0,
    deluxeRooms: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const isRoomCountField = ['singleRooms', 'doubleRooms', 'deluxeRooms'].includes(name);
    setFormData({
      ...formData,
      [name]: isRoomCountField ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/hotels', formData);
      navigate('/admin-reviews');
    } catch (error) {
      console.error("Error saving hotel data:", error);
    }
  };

  return (
    <div className='add-hotel'>
      <Navbar1 />
      <br></br>
      <br></br>
    <div className="container">
      <h2>Add Hotel</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add Hotel</button>
      </form>
    </div>
    <br></br>
    </div>
  );
}

export default AddHotel;