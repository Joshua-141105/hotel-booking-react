import React, { useEffect, useState } from 'react';
import './UserReviews.css';

function UserReviews() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${BASE_URL}/reviews`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) {
      alert("Please enter a review before submitting.");
      return;
    }

    const nextId = reviews.length ? reviews[reviews.length - 1].id + 1 : 1;
    const newUserReview = { id: nextId, name: "You", review: newReview.trim() };

    try {
      await fetch(`${BASE_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUserReview),
      });

      setReviews((prev) => [...prev, newUserReview]);
      setNewReview("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
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

      <form onSubmit={handleReviewSubmit}>
        <label htmlFor="review-input">Add a review:</label>
        <input
          id="review-input"
          type="text"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write your review here..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserReviews;
