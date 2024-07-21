Course Component
The Course component manages the display of courses, allows filtering, and enables users to select and add courses to their list.

Features:

Displays a list of courses fetched from a JSON server (http://127.0.0.1:5555/courses).
Allows searching courses by title or description.
Modal popup to view course details and add the course to "My Courses".
Fetches and displays "My Courses" from http://127.0.0.1:5555/mycourses.
Usage:

Input search keywords to filter courses dynamically.
Click on a course card to view details and add the course to "My Courses".
Dependencies:

Requires Navbar and CourseCard components.
API Endpoints:

GET http://127.0.0.1:5555/courses to fetch all courses.
GET http://127.0.0.1:5555/mycourses to fetch selected courses.
CourseCard Component
The CourseCard component renders a card representing a course with its title and description.

Features:

Displays course details including title and description.
Clicking on the card triggers an onClick event (commonly used for selecting or viewing more details).
Usage:

Used by the Course component to display each course fetched from the server.
Props:

title: Title of the course.
description: Description of the course.
onClick: Function triggered when the card is clicked.
CoursePage Component
The CoursePage component integrates Course and MyCourses components to manage course selection and display.

Features:

Fetches courses from http://localhost:3031/courses.
Allows users to add courses to their selected courses list (selectedCourses).
Displays selected courses in the MyCourses component.
Usage:

Renders the Course component to display available courses.
Renders the MyCourses component to display selected courses.
Dependencies:

Requires Course and MyCourses components.
API Endpoint:

GET http://localhost:3031/courses to fetch all courses. -->





<!-- markdown
Copy code
# Course Management Application

## Overview

This React application allows users to manage and view courses, handle user authentication, and display student information. It integrates with a backend API for data persistence and retrieval.

## Components

### 1. `Course`

**Description:**  
The `Course` component is responsible for displaying a list of courses. It includes features for searching and filtering courses, as well as viewing and selecting individual courses. It interacts with a modal to show course details and manage user selections.

**Features:**
- Fetches a list of courses and user's courses from a backend server.
- Provides search functionality to filter courses based on title or description.
- Displays course details in a modal when a course is selected.
- Allows users to add selected courses to their collection.

**Dependencies:**
- `Navbar` - Provides navigation for the application.
- `CourseCard` - Renders individual course details in a card format.

**Usage:**
```jsx
import Course from './Course';

// In your component
<Course onAddCourse={handleAddCourse} />
Props:

onAddCourse (function): Callback function to handle adding a course to the user's collection.
State:

courses (array): Stores the list of all available courses.
modal (boolean): Controls the visibility of the course detail modal.
selectedCourse (object|null): Stores the currently selected course for detail viewing.
filteredCourses (array): Stores the filtered list of courses based on the search input.
search (string): The current search query for filtering courses.
myCourses (array): Stores the list of courses selected by the user.
Methods:

useEffect (fetch data from backend): Fetches courses and user’s selected courses when the component mounts.
filterCourses (function): Filters the list of courses based on the search input.
openCourse (function): Opens the modal and sets the selected course.
postCourse (function): Adds the selected course to the user’s collection.
2. CourseCard
Description:
The CourseCard component displays details of a single course in a card layout. It is used both in the course list and in the modal for viewing course details.

Features:

Displays the course title, description, and optionally an image.
Triggers an onClick event to handle user interactions.
Props:

id (string): Unique identifier for the course.
image (string): URL or path to the course image (optional).
title (string): Title of the course.
description (string): Description of the course.
onClick (function): Function to handle click events.
Usage:

jsx
Copy code
import CourseCard from './CourseCard';

// In your component
<CourseCard
  id={course.id}
  image={course.image}
  title={course.title}
  description={course.description}
  onClick={() => handleCardClick(course)}
/>
3. CoursePage
Description:
The CoursePage component is the main page for managing courses. It combines the Course and MyCourses components to display both available and selected courses.

Features:

Manages the state of selected courses.
Fetches course data from the backend.
Passes data to the Course and MyCourses components.
Usage:

jsx
Copy code
import CoursePage from './CoursePage';

// In your component
<CoursePage />
State:

courses (array): Stores the list of all courses.
selectedCourses (array): Stores the list of courses selected by the user.
Methods:

handleAddCourse (function): Updates the list of selected courses.
4. Login
Description:
The Login component provides a user interface for logging into the application. It handles user authentication and redirects to the course page upon successful login.

Features:

Collects username and password.
Sends login credentials to the backend for authentication.
Redirects users to the course page on successful login.
Props:

setUser (function): Callback function to set the authenticated user.
Usage:

jsx
Copy code
import Login from './Login';

// In your component
<Login setUser={setUser} />
State:

username (string): Stores the username input by the user.
password (string): Stores the password input by the user.
Methods:

postLogin (function): Handles form submission and sends login request to the backend.
5. Signup
Description:
The Signup component provides a user interface for registering a new account. It collects user details and creates a new user account via a backend API.

Features:

Collects first name, last name, email, and password.
Sends registration details to the backend to create a new user account.
Redirects to the login page upon successful registration.
Props:

setUser (function): Callback function to set the authenticated user after signup.
Usage:

jsx
Copy code
import Signup from './Signup';

// In your component
<Signup setUser={setUser} />
State:

firstName (string): Stores the user's first name.
lastName (string): Stores the user's last name.
email (string): Stores the user's email address.
password (string): Stores the user's password.
formSubmitted (boolean): Indicates if the signup form has been submitted.
Methods:

postSignup (function): Handles form submission and sends registration request to the backend.
6. Students
Description:
The Students component displays a list of students fetched from the backend. It renders student details in a table format.

Features:

Fetches student data from the backend.
Displays student information in a table.
Usage:

jsx
Copy code
import Students from './Students';

// In your component
<Students />
State:

students (array): Stores the list of students.
Methods:

fetchStudents (function): Fetches student data from the backend.
Setup
Clone the Repository:

bash
Copy code
git clone <repository-url>
cd <repository-directory>
Install Dependencies:

bash
Copy code
npm install
Run the Application:

bash
Copy code
npm start
The application will be available at http://localhost:3000.

Backend Setup:
Ensure you have a local backend running at http://localhost:5555 to handle API requests.

Folder Structure
src/
components/
Course.js
CourseCard.js
CoursePage.js
Login.js
Signup.js
Students.js
Navbar.js
App.js
index.js
public/
package.json
Dependencies
react
react-dom
react-router-dom
 -->