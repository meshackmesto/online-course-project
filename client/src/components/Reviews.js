import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";

function Reviews() {
  const [body, setBody] = useState("");
  const [reviews, setReviews] = useState([]);
  const [postedReviews, setPostedReviews] = useState([]);

  console.log(reviews);
  const baseUrl = "http://localhost:3031";

  useEffect(() => {
    fetch(`${baseUrl}/reviews`)
      .then((response) => response.json())
      .then((reviews) => setPostedReviews(reviews))
      .catch((err) => console.log(err));
  }, []);

  function addReview(newReview) {
    setPostedReviews([...postedReviews, newReview]);
  }

  /* const userReview = postedReviews.map((review) => {
    setReviews(review)
 }); */

  function postReview(e) {
    e.preventDefault();

    fetch(`${baseUrl}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review: body,
      }),
    })
      .then((response) => response.json())
      .then((newReview) => addReview(newReview));
    setBody("");
  }

  return (
    <div>
      <Navbar />
      <form className="review-form">
        <h1>Reviews</h1>

        <div className="review-container">
          {postedReviews &&
            postedReviews.map((review) => (
              <ReviewCard
                /* username = {review.username} */
                review={review.review}
              />
            ))}
        </div>

        <input
          type="text"
          placeholder="write a review"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <button className="post-review" onClick={postReview}>
          Post Review
        </button>

        <button className="delete-review">Delete Review</button>
      </form>
    </div>
  );
}

export default Reviews;
