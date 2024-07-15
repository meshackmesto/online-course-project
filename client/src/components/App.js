import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Course from "./Course";
import Students from "./Students";
import Navbar from "./bar";
import Sidebar from "./Navbar";
import Reviews from "./Reviews";
import Login from "./Login";
import Signup from "./Signup";
import MyCourses from "./MyCourses";
import "../App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <div>
      <main>
        {user ? (
          <Switch>
            <Route exact path="/" component={Home}>
              <Home user={user} />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/signup" component={Signup}>
              <Signup setUser={setUser} />
            </Route>
            <Route path="/login" component={Login}>
              <Login setUser={setUser} />
            </Route>
            <Route exact path="/" component={Home} />
            <Route path="/course" component={Course} />
            <Route path="/students" component={Students} />
            <Route path="/reviews" component={Reviews} />
            <Route path="/navbar" component={Navbar} />
            <Route path="/sidebar" component={Sidebar} />
            <Route path="/mycourses" component={MyCourses} />
          </Switch>
        )}
      </main>
    </div>
  );
}

export default App;
