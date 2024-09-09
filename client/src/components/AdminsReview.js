
import React, { useEffect, useState } from "react";
import './AdminsReview.css';

function AdminsReviews() {
  const [reviews, setReviews] = useState([]);

  const API = process.env.REACT_APP_SERVER_API;
 
  useEffect(() => {
    fetch(`${API}/reviews`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  // Delete a review
  function handleDeleteReview(id) {
    fetch(`${API}/reviews/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setReviews(reviews.filter((review) => review.id !== id));
      })
      .catch((error) => console.error("Error deleting review:", error));
  }

  return (
    <div className="container">
      <h3>Reviews</h3>
      <div className="admin-reviews">
      {/* Review List */}
      <div className="review-cards">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <p className="ratings">Rating: {review.rating}</p>
            <p className="comments">{review.comment}</p>
            <button onClick={() => handleDeleteReview(review.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default AdminsReviews;
