import Navbar from "./Navbar";
import React, {useEffect, useState} from "react";


function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    fetch('/api/reviews')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        return response.json();
      })
      .then(reviewsData => {
        setReviews(reviewsData);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  };

  const addReview = () => {
    fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: newReview })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add review');
        }
        return response.json();
      })
      .then(newReviewData => {
        setReviews([...reviews, newReviewData]);
        setNewReview('');
      })
      .catch(error => {
        console.error('Error adding review:', error);
      });
  };

  const deleteReview = (id) => {
    fetch(`/api/reviews/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete review');
        }
        const updatedReviews = reviews.filter(review => review.id !== id);
        setReviews(updatedReviews);
      })
      .catch(error => {
        console.error('Error deleting review:', error);
      });
  };

  const editReview = (index) => {
    setEditIndex(index);
    setNewReview(reviews[index].text);
  };

  const updateReview = (id) => {
    fetch(`/api/reviews/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: newReview })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update review');
        }
        const updatedReviews = [...reviews];
        updatedReviews[editIndex] = { id, text: newReview };
        setReviews(updatedReviews);
        setEditIndex(-1);
        setNewReview('');
      })
      .catch(error => {
        console.error('Error updating review:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <h1>Reviews</h1>

      <div>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Enter your review..."
          rows={4}
          cols={50}
        />
        <br />
        {editIndex === -1 ? (
          <button onClick={addReview}>Add Review</button>
        ) : (
          <button onClick={() => updateReview(reviews[editIndex].id)}>Update Review</button>
        )}
      </div>

      <ul>
        {reviews.map((review, index) => (
          <li key={review.id}>
            {editIndex === index ? (
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Edit your review..."
                rows={4}
                cols={50}
              />
            ) : (
              <div>{review.text}</div>
            )}
            <br />
            {editIndex === index ? (
              <button onClick={() => updateReview(review.id)}>Save</button>
            ) : (
              <>
                <button onClick={() => editReview(index)}>Edit</button>
                <button onClick={() => deleteReview(review.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Reviews;
