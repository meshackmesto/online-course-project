import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Course from "./Course";
import Students from "./Students";
import Navbar from "./Navbar";
import Reviews from "./Reviews";
import Login from "./Login";
import Signup from "./Signup";
import MyCourses from "./MyCourses";
import { UserContext } from "./UserProvider";
import "../App.css";

function App() {
  const [user, setUser] = useContext(UserContext);

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
  }, [setUser]);

  return (
    <div>
      <main>
        <Switch>
          {/* Public routes accessible to anyone*/}
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup}>
            <Signup setUser={setUser} />
          </Route>
          <Route path="/login" render={() => <Login setUser={setUser} />} />

          {/* Private routes when logged in*/}
          {user ? (
            <>
              <Route path="/course" component={Course} />
              <Route path="/students" component={Students} />
              <Route path="/reviews" component={Reviews} />
              <Route path="/navbar" component={Navbar} />
              <Route path="/mycourses" component={MyCourses} />
            </>
          ) : (
            // If not logged in
            <Redirect to="/login" />
          )}

          {/* Catch all unmatched routes */}
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
