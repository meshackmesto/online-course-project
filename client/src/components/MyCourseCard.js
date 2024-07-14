import React from "react";
function MyCourseCard({ id, image, title, description, removeCourse }) {
  const handleDelete = () => {
    removeCourse(id);
  };

  return (
    <div className="mycoursecard">
      <div className="card-header">
        <button className="close" onClick={handleDelete}>
          <img src="../images/cancel.png" alt="cancel" />
        </button>
        <h2>{id}</h2>
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        {/*  <img
          src={require(`../images/${image}`).default}
          alt={title}
          className="images"
        /> */}
        <p>{description}</p>
      </div>
    </div>
  );
}
export default MyCourseCard;
