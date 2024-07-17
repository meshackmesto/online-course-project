# Online Course Platform

#### Date: July 17, 2024

#### Team Members: FAITH KIMARU , ALVIN KYLE , BRIDGET MUCHESIA , MESHACK ORINA, DUDLEY KIMANI


## Introduction
### Overview
 This project is an online course platform where users can explore various courses, enroll in their desired courses, and leave reviews. The application provides functionalities for user authentication (sign-up and log-in), course browsing, enrollment, and review submissions. The platform is built with a Flask backend and a React frontend.

## Key Features

- *User Authentication*: Users can sign up and log in to access their personalized dashboard.
- *Course Browsing*: Users can view a list of available courses.
- *Course Enrollment*: Users can enroll in courses and view them in the "My Courses" section.
- *Course Reviews*: Users can leave reviews for the courses they have taken.

### User Authentication
User authentication allows users to sign up and log in securely to access their personalized dashboard. This involves creating an account with a username, email, and password, and then logging in with those credentials. Security measures like password hashing and email verification are implemented to ensure user data is protected and only authorized users can access their information and course materials.

### Course Browsing
Course browsing enables users to view a list of available courses with essential details like title, description, instructor, and duration. It includes search and filter options to help users find courses that match their interests. Course previews provide snippets of content, aiding users in making informed decisions about enrollment.

### Course Enrollment
Course enrollment allows users to enroll in courses and view them in a personalized "My Courses" section. Users can easily sign up for courses, receive confirmation, and gain access to the course content. This feature helps users organize their learning and track their progress, making it easy to resume learning at any time.

### Course Reviews
Course reviews enable users to leave feedback and ratings for the courses they have taken. Reviews are displayed on the course page, helping prospective students gauge the quality and relevance of the course. This feature provides valuable feedback to instructors and builds trust and credibility within the learning community.

## Directory Structure

The project follows a typical full-stack structure with separate directories for the frontend and backend code.


.
├── CONTRIBUTING.md
├── LICENSE.md
├── Pipfile
├── README.md
├── client
│   ├── README.md
│   ├── package.json
│   ├── public
│   └── src
└── server
    ├── app.py
    ├── config.py
    ├── models.py
    └── seed.py


## Technologies used
React.js
Python
Flask 
CSS
SQLITE

 ## Backend Setup

 ### Navigate to the server directory 
 cd server/backend

 ### Install dependencies
 pipenv install
 pipenv shell

 ### Run the flask server
 python app.py


 ## Frontend Setup

 ### Navigate to the client directory
 cd client 

 ### Install dependencies
 npm install --prefix client

 ### Run the React application
 npm start --prefix client

  ## Database Setup
 ### Database Initialization

#### Navigate to the server directory
cd server

#### Initialize the database
 flask db init

#### Create the initial database migration
flask db migrate -m "Initial migration"

#### Apply the migration to the database
flask db upgrade

#### Check the new directory structure
tree -L 2

## Support and Contact Details
For any questions, feedback, or support inquiries, please don't hesitate to reach out to us via:

GitHub: meshackmesto,alvinKyle,Dudley-hue,One-G-Row and VenusBridget
Email: info@Online-Course-Platform.com

Thank you for choosing Online-Course-Platform.
### License
The content of this site is licensed under the MIT license
Copyright (c) 2018.