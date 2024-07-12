function ReviewCard({ username, review }) {
  return (
    <div className="review-card">
      {/*  <h2>{username}</h2> */}
      <p>{review}</p>
    </div>
  );
}

export default ReviewCard;
