import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for routing
import './AdminReviews.css';
import Navbar1 from '../comp1/Navbar1';

function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsResponse, hotelsResponse] = await Promise.all([
          axios.get('http://localhost:8080/reviews'),
          axios.get('http://localhost:8080/hotels'),
        ]);
        setReviews(reviewsResponse.data);
        setHotels(hotelsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{backgroundColor : 'black', alignItems: 'center'}}>
      <div className='admin-reviews-container'>
        <Navbar1 />
        <center>
          <br /><br /><br />
          <div className="centered-container" style={{ paddingTop: '25px' }}>
            <div className="user-reviews">
              <h2>User Reviews</h2>
              <center>
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
              </center>
              <br />
              <h2>Hotels</h2>
              <div className='hotel-listing'>
                <center>
                  <ul>
                    {hotels.length > 0 ? (
                      hotels.map((hotel) => (
                        <li key={hotel.id} style={{ marginBottom: '20px' }}>
                          <div className="hotel-item">
                            <img src={hotel.image} alt={`${hotel.name}`} className="hotel-image" />
                            <div className="hotel-details">
                              <strong>{hotel.name}:</strong> {hotel.location}
                            </div>
                            <div className="button-container">
                              <Link to={`/hotel-details/${hotel.id}`}>
                                <button>
                                  View Details
                                </button>
                              </Link>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>No hotels available.</li>
                    )}
                  </ul>
                </center>
              </div>
              <br />
              <center>
                <Link to="/add-hotel">
                  <button>Add Hotel</button>
                </Link>
              </center>
            </div>
          </div>
        </center>
      </div>
    </div>
  );
}

export default AdminReviews;