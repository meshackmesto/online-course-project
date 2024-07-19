import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Course from "./Course";
import Students from "./Students";
import Navbar from "./Navbar";
import Reviews from "./Reviews";
import Login from "./Login";
import Signup from "./Signup";
import MyCourses from "./MyCourses";
import "../App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session")
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw new Error("No session found");
      })
      .then((user) => setUser(user))
      .catch(() => setUser(null));
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
            <Route path="/login" render={() => <Login setUser={setUser} />} />
            <Route exact path="/" component={Home} />
            <Route path="/course" component={Course} />
            <Route path="/students" component={Students} />
            <Route path="/reviews" component={Reviews} />
            <Route path="/navbar" component={Navbar} />
            <Route path="/mycourses" component={MyCourses} />
          </Switch>
        )}
      </main>
    </div>
  );
}

export default App;
