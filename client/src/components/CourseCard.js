import React, { useState } from "react";
import angularImage from "../assets/image/angular.jpg";
import djangoImage from "../assets/image/django.jpg";
import flaskImage from "../assets/image/flask.jpg";
import reactImage from "../assets/image/react.jpg";
import pythonImage from "../assets/image/python.jpg";
import webdevelopmentImage from "../assets/image/webdevelopment.jpg";

const imageMap = {
  1: angularImage,
  2: djangoImage,
  3: flaskImage,
  4: reactImage,
  5: pythonImage,
  6: webdevelopmentImage,
};

function CourseCard({ id, image, title, description, onClick }) {
  const selectedImage = imageMap[id] || pythonImage;

  return (
    <div className="card" onClick={onClick}>
      <div className="card-header">
        <h2>{id}</h2>
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        <img src={selectedImage} alt={title} className="images" />
        {/*   <img
          src={image ? require(`../images/${image}`).default : defaultImage}
          alt={title}
          className="images"
        /> */}
        <p>{description}</p>
      </div>
    </div>
  );
}
export default CourseCard;
