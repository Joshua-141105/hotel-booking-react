import { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminReviews.css';
import Navbar1 from '../comp1/Navbar1';

function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [roomDetails, setRoomDetails] = useState([]);
  const [add, setAdd] = useState(false);
  const [isEditingHotelId, setIsEditingHotelId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    image: '',
    location: '',
    singleRooms: 0,
    doubleRooms: 0,
    deluxeRooms: 0,
  });
  const [formData, setFormData] = useState({
    hotelName: '',
    hotelImage: '',
    hotelLocation: '',
    singleRooms: 0,
    doubleRooms: 0,
    deluxeRooms: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsResponse, hotelsResponse, roomDetailsResponse] = await Promise.all([
          axios.get('http://localhost:8080/reviews'),
          axios.get('http://localhost:8080/hotels'),
          axios.get('http://localhost:8080/roomDetails'),
        ]);
        setReviews(reviewsResponse.data);
        setHotels(hotelsResponse.data);
        setRoomDetails(roomDetailsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Convert room count inputs to integers if the field is for rooms
    const isRoomCountField = ['singleRooms', 'doubleRooms', 'deluxeRooms'].includes(name);
    setFormData({
      ...formData,
      [name]: isRoomCountField ? parseInt(value, 10) : value,
    });
  };
  
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    
    // Convert room count inputs to integers if the field is for rooms
    const isRoomCountField = ['singleRooms', 'doubleRooms', 'deluxeRooms'].includes(name);
    setEditFormData({
      ...editFormData,
      [name]: isRoomCountField ? parseInt(value, 10) : value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.hotelName === '' || formData.hotelImage === '' || formData.hotelLocation === '') {
      alert('Fields must not be empty.');
      return;
    }
    if (formData.singleRooms === 0 && formData.doubleRooms === 0 && formData.deluxeRooms === 0) {
      alert('Select at least 1 room');
      return;
    }
    try {
      const newHotel = {
        name: formData.hotelName,
        image: formData.hotelImage,
        location: formData.hotelLocation,
        singleRooms: formData.singleRooms,
        doubleRooms: formData.doubleRooms,
        deluxeRooms: formData.deluxeRooms,
        available: true,
      };
      await axios.post('http://localhost:8080/hotels', newHotel);
      setHotels([...hotels, newHotel]);
      setAdd(false);
      setFormData({ hotelName: '', hotelImage: '', hotelLocation: '', singleRooms: 0, doubleRooms: 0, deluxeRooms: 0 });
      console.log("New Hotel Added:", newHotel);
    } catch (error) {
      console.error("Error adding hotel:", error);
    }
  };

  const handleAddHotelClick = () => {
    setAdd(true);
  };

  const handleDeleteHotel = async (hotelId) => {
    try {
      await axios.delete(`http://localhost:8080/hotels/${hotelId}`);
      setHotels(hotels.filter((hotel) => hotel.id !== hotelId));
      setRoomDetails(roomDetails.filter((room) => room.id !== hotelId));
      console.log("Hotel deleted:", hotelId);
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  const handleEditHotelClick = (hotel) => {
    if (isEditingHotelId === hotel.id) {
      setIsEditingHotelId(null);
    } else {
      setIsEditingHotelId(hotel.id);
      setEditFormData({
        name: hotel.name || '',
        image: hotel.image || '',
        location: hotel.location || '',
        singleRooms: roomDetails.find((room) => room.id === hotel.id)?.Single?.count || 0,
        doubleRooms: roomDetails.find((room) => room.id === hotel.id)?.Double?.count || 0,
        deluxeRooms: roomDetails.find((room) => room.id === hotel.id)?.Deluxe?.count || 0,
      });
    }
  };

  const handleUpdateHotel = async (hotelId) => {
    try {
      const updatedData = {
        name: editFormData.name,
        image: editFormData.image,
        location: editFormData.location,
        singleRooms: editFormData.singleRooms,
        doubleRooms: editFormData.doubleRooms,
        deluxeRooms: editFormData.deluxeRooms,
      };

      // Update hotel details with name, image, and location
      await axios.put(`http://localhost:8080/hotels/${hotelId}`, {
        name: updatedData.name,
        image: updatedData.image,
        location: updatedData.location,
        available: !(
          updatedData.singleRooms === 0 &&
          updatedData.doubleRooms === 0 &&
          updatedData.deluxeRooms === 0
        ),
      });

      // Update room details
      const updatedRoomDetails = {
        Single: {
          count: updatedData.singleRooms,
          price: roomDetails.find((room) => room.id === hotelId)?.Single?.price || 0,
        },
        Double: {
          count: updatedData.doubleRooms,
          price: roomDetails.find((room) => room.id === hotelId)?.Double?.price || 0,
        },
        Deluxe: {
          count: updatedData.deluxeRooms,
          price: roomDetails.find((room) => room.id === hotelId)?.Deluxe?.price || 0,
        },
      };

      await axios.put(`http://localhost:8080/roomDetails/${hotelId}`, updatedRoomDetails);

      setHotels((prevHotels) =>
        prevHotels.map((hotel) =>
          hotel.id === hotelId
            ? { ...hotel, ...updatedData }
            : hotel
        )
      );

      setRoomDetails((prevRoomDetails) =>
        prevRoomDetails.map((room) =>
          room.id === hotelId
            ? updatedRoomDetails
            : room
        )
      );

      setIsEditingHotelId(null);
      console.log("Hotel updated:", updatedData);
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

  return (
    <div style={{backgroundColor : 'black'}}>
      <div className='admin-reviews-container'>
        <Navbar1 />
        <br /><br /><br />
        <div className="centered-container" style={{ paddingTop: '25px' }}>
          <div className="user-reviews">
            <h2>User Reviews</h2>
            <ul>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <li key={review.id}>
                    <strong>{review.name}:</strong> {review.review}
                  </li>
                ))
              ) : (
                <li>No reviews yet.</li>
              )}
            </ul>
            <br />
            <h2>Hotels</h2>
            <ul>
              {hotels.length > 0 ? (
                hotels.map((hotel) => (
                  <li key={hotel.id} style={{ marginBottom: '20px' }}>
                    <div className="hotel-item">
                      <div className="hotel-details">
                        <strong>{hotel.name}:</strong> {hotel.location}
                      </div>
                      <div className="button-container">
                        <button onClick={() => handleDeleteHotel(hotel.id)} style={{ marginRight: '10px' }}>
                          Delete
                        </button>
                        <button onClick={() => handleEditHotelClick(hotel)}>
                          {isEditingHotelId === hotel.id ? "Close Update" : "Update Rooms"}
                        </button>
                      </div>
                    </div>
                    {isEditingHotelId === hotel.id && (
                      <div className="edit-section" style={{ marginTop: '20px' }}>
                        <form className="edit-room-form">
                          <label>
                            Hotel Name:
                            <input
                              type="text"
                              name="name"
                              value={editFormData.name}
                              onChange={handleEditInputChange}
                              required
                            />
                          </label>
                          <label>
                            Hotel Image URL:
                            <input
                              type="text"
                              name="image"
                              value={editFormData.image}
                              onChange={handleEditInputChange}
                              required
                            />
                          </label>
                          <label>
                            Hotel Location:
                            <input
                              type="text"
                              name="location"
                              value={editFormData.location}
                              onChange={handleEditInputChange}
                              required
                            />
                          </label>
                          <label>
                            Number of Single Rooms:
                            <input
                              type="number"
                              name="singleRooms"
                              min="0"
                              value={editFormData.singleRooms}
                              onChange={handleEditInputChange}
                              required
                            />
                          </label>
                          <label>
                            Number of Double Rooms:
                            <input
                              type="number"
                              name="doubleRooms"
                              min="0"
                              value={editFormData.doubleRooms}
                              onChange={handleEditInputChange}
                              required
                            />
                          </label>
                          <label>
                            Number of Deluxe Rooms:
                            <input
                              type="number"
                              name="deluxeRooms"
                              min="0"
                              value={editFormData.deluxeRooms}
                              onChange={handleEditInputChange}
                              required
                            />
                          </label>
                          <button type="button" onClick={() => handleUpdateHotel(hotel.id)}>Update</button>
                        </form>
                      </div>
                    )}
                  </li>
                ))
              ) : (
                <li>No hotels available.</li>
              )}
            </ul>

            <br></br>
            <center>
              <button onClick={handleAddHotelClick}>Add Hotel</button>
              </center>
            {add && (
              <form onSubmit={handleSubmit}>
                <label>
                  Hotel Name:
                  <input type="text" name="hotelName" value={formData.hotelName} onChange={handleInputChange} required />
                </label>
                <label>
                  Hotel Image URL:
                  <input type="text" name="hotelImage" value={formData.hotelImage} onChange={handleInputChange} required />
                </label>
                <label>
                  Hotel Location:
                  <input type="text" name="hotelLocation" value={formData.hotelLocation} onChange={handleInputChange} required />
                </label>
                <label>
                  Number of Single Rooms:
                  <input type="number" name="singleRooms" min="0" value={formData.singleRooms} onChange={handleInputChange} required />
                </label>
                <label>
                  Number of Double Rooms:
                  <input type="number" name="doubleRooms" min="0" value={formData.doubleRooms} onChange={handleInputChange} required />
                </label>
                <label>
                  Number of Deluxe Rooms:
                  <input type="number" name="deluxeRooms" min="0" value={formData.deluxeRooms} onChange={handleInputChange} required />
                </label>
                <button type="submit">Add Hotel</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReviews;
