import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Course from "./Course";
import Enrollment from "./Enrollment";
import Navbar from "./Navbar";
import Reviews from "./Reviews";
import Signup from "./Signup";
import MyCourses from "./MyCourses";
import "../App.css";

function App() {
  return (
    <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/course" component={Course} />
          <Route path="/enrollment" component={Enrollment} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/navbar" component={Navbar} />
          <Route path="signup" component={Signup} />
          <Route path="/mycourses" component={MyCourses} />
        </Switch>
    </div>
  );
}

export default App;
