import React, { useEffect, useState } from "react";
import './AdminReviews.css';

function Reviews() {
  const [reviews, setReviews] = useState([]);

  // Fetch all reviews on component mount
  useEffect(() => {
    fetch("http://localhost:5555/reviews")
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  // Delete a review
  function handleDeleteReview(id) {
    fetch(`http://localhost:5555/reviews/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setReviews(reviews.filter((review) => review.id !== id));
      })
      .catch((error) => console.error("Error deleting review:", error));
  }

  return (
    <div>
      <Navbar />
      <h2>Reviews</h2>

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
  );
}

export default Reviews;
