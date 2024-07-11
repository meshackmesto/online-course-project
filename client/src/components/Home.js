import React from "react";
import Navbar from "./Navbar";
import books from "../assets/image/books.jpg"

function Home() {
  return (
    <div className="home">
      <Navbar />
      <section className="container">
        <container>
          <row>
            <div className="col1">
            <h1>Welcome to our Online Course Website, where learning meets innovation</h1>
              <p>
                "At [Course Website Name], we are dedicated to providing you with top-quality 
                courses designed to empower and inspire. Whether you're looking to enhance your
                professional skills or explore a new passion, we have curated a diverse selection 
                of courses crafted by experts in their fields."
              </p>
            </div>

            <div className="col2">
              <img src={books} alt="" className="w-100"/>
            </div>
          </row>
        </container>
      </section>
      {/* <main className="content">
        <p>"Our courses are designed to be practical, engaging, and accessible, ensuring that 
          you gain the skills and knowledge needed to succeed in today's competitive world. 
          Join thousands of learners worldwide who have already transformed their careers and 
          personal lives through our interactive learning experiences."
        </p>
      </main> */}

      {/* <div className=""col-sm-6"">
        <h2>Featured Courses</h2>
        <p>"Ready to embark on your learning journey? Browse our catalog of courses and start learning today!"</p>
        <div class="course-cards"> */}
          {/* CourseCard component will be imported and used here */}
        {/* </div>
      </div> */}

      {/* <div className="content"> */}
        {/* <h2>Some of the students Reviews</h2>
        <div class="col lg='6' md= '6'"> */}
          {/* reviewsCard component will be imported and used here */}
        {/* </div> */}
      {/* // </div>
      <div className="content">
        <h2>Contact Us</h2>
        <p>Email: [Contact Email]</p>
        <p>Phone: [Contact Phone Number]</p>
        <p>Address: [Contact Address]</p>
        <p>Hours: [Contact Hours]</p>
      </div> */}

      {/* Footer component will be imported and used here */}

    </div>
  );
}

export default Home;
