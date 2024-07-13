import React from "react";
function CourseCard({ id, image, title, description, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-header">
        <h2>{id}</h2>
        <h3>{title}</h3>
      </div>
      <div className="card-body">
      {/*  <img
          src={require(`../images/${image}`).default}
          alt={title}
          className="images"
        />  */}
        <p>{description}</p>
      </div>
    </div>
  );
}
export default CourseCard;
