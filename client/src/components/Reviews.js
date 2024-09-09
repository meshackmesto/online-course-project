import React, { useEffect, useState, useContext } from "react";
import Navbar from "./Navbar";
import { UserContext } from "./UserProvider";

function Reviews({ admin }) {
  const [reviews, setReviews] = useState([]);
  const [editReview, setEditReview] = useState(null);
  const [newReview, setNewReview] = useState({ comment: "", rating: "0" });
  const [responseMessage, setResponseMessage] = useState("");
  const [user] = useContext(UserContext);

  const API = process.env.REACT_APP_SERVER_API;

  // Fetch all reviews on component mount
  useEffect(() => {
    fetch(`${API}/reviews`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  // Add a new review
  function handleAddReview(e) {
    e.preventDefault();
    fetch(`${API}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: newReview.comment,
        rating: newReview.rating,
      }),
    })
      .then((response) => response.json())
      .then((addedReview) => {
        setReviews([...reviews, addedReview]);
        setNewReview({ comment: "", rating: "0" });
        alert("Review added successfully");
      })
      .catch((error) => console.error("Error adding review:", error));
  }

  // Delete a review
  function handleDeleteReview(id) {
    if (!admin) {
      setResponseMessage(
        "You must be logged in as an admin to delete a review."
      );
      return;
    }
    
    fetch(`${API}/reviews/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete review");
        }
        setReviews(reviews.filter((review) => review.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
        setResponseMessage("Failed to delete review.");
      });
  }

  // Edit a review
  function handleEditReview(review) {
    setEditReview(review);
    setNewReview({ comment: review.comment, rating: review.rating });
  }

  // Update an existing review
  function handleUpdateReview(e) {
    e.preventDefault();
    fetch(`${API}/reviews/${editReview.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: newReview.comment,
        rating: newReview.rating,
      }),
    })
      .then((response) => response.json())
      .then((updatedReview) => {
        setReviews(
          reviews.map((review) =>
            review.id === updatedReview.id ? updatedReview : review
          )
        );
        setEditReview(null);
        setNewReview({ comment: "", rating: "0" });
      })
      .catch((error) => console.error("Error updating review:", error));
  }

  return (
    <div>
      <Navbar />
      <h2>Reviews</h2>

      {/* Review Form */}
      <div className="reviews-container">
        <form className="review-form" onSubmit={editReview ? handleUpdateReview : handleAddReview}>
          <textarea
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            placeholder="Enter your review..."
            rows={4}
            cols={50}
          />
          <br />
          <input
            type="number"
            value={newReview.rating}
            onChange={(e) =>
              setNewReview({ ...newReview, rating: e.target.value })
            }
            placeholder="rating (0-5)"
            min="0"
            max="5"
          />
          <br />
          <button type="submit">
            {editReview ? "Update Review" : "Add Review"}
          </button>
          {editReview && (
            <button type="button" onClick={() => setEditReview(null)}>
              Cancel
            </button>
          )}
        </form>
        {/* Review List */}
        {/* {admin && handleDeleteReview && (
          <div className="review-cards">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <p className="ratings">Rating: {review.rating}</p>
                <p className="comments">{review.comment}</p>
                <button onClick={() => handleEditReview(review)}>Edit</button>
                <button onClick={() => handleDeleteReview(review.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        ):( */}
        <div className="review-cards">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <p className="ratings">Rating: {review.rating}</p>
              <p className="comments">{review.comment}</p>
              <button onClick={() => handleEditReview(review)}>Edit</button>
              {admin && ( 
              <button onClick={() => handleDeleteReview(review.id)}>
                Delete
              </button>
              )} 
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
