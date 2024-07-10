import React from "react";
function CourseCard({ title, description, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-header"></div>
      <div className="card-body">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
export default CourseCard;
