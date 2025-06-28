import React, { useEffect, useState } from 'react';
import './UserReviews.css';

function UserReviews() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  // Fetch reviews from db.json
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:8080/reviews');
        const data = await response.json();
        setReviews(data); // Set the fetched reviews into state
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const nextId = reviews.length ? reviews[reviews.length - 1].id + 1 : 1; // Incrementing ID based on existing reviews
    const newUserReview = { id: nextId, name: "You", review: newReview };

    // Submit the new review to db.json
    try {
      await fetch('http://localhost:8080/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserReview),
      });
      setReviews((prevReviews) => [...prevReviews, newUserReview]); // Add new review to the state
      setNewReview(""); // Clear input field
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="user-reviews">
      <h2>User Reviews</h2>
      <ul>
        <center>

        {reviews.length > 0 ? ( // Check if there are reviews to display
          reviews.map(review => (
            <li key={review.id}>
              <strong>{review.name}:</strong> {review.review}
            </li>
          ))
        ) : (
          <li>No reviews yet.</li> // Message if there are no reviews
        )}
        </center>
      </ul>
      <form onSubmit={handleReviewSubmit}>
        <label>
          Add a review:
          <br /><br />
          <input 
            type="text" 
            value={newReview} 
            onChange={(e) => setNewReview(e.target.value)} 
            placeholder="Write your review here..." // Placeholder for user input
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserReviews;
