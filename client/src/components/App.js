import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Course from "./Course";
import Students from "./Students";
import Navbar from "./Navbar";
import Reviews from "./Reviews";
import Login from "./Login";
import Signup from "./Signup";
import MyCourses from "./MyCourses";
import Admin from "./AdminRegistrationForm";
import LoginAdmin from "./LoginAdmin";
import AdminCourses from './AdminCourses';
import { UserContext } from "./UserProvider";
import "../App.css";

function App() {
  const [user, setUser] = useContext(UserContext);
  const [admin, setAdmin] = useContext(UserContext);
  /* const [isAdmin, setIsAdmin] = useState(false); */

  useEffect(() => {
    fetch("/check_session")
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw new Error("No session found");
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, [setUser]);

  useEffect(() => {
    fetch("/check_admin_session")
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw new Error("No session found");
      })
      .then((data) => setAdmin(data))
      .catch(() => setAdmin(null));
  }, [setAdmin]);

  const isUserAdmin = { admin };
  console.log("Admin status:", isUserAdmin);

  return (
    <div>
      <main>
        <Switch>
          {/* Public routes accessible to anyone*/}
          <Route exact path="/" component={Home} />
          <Route path="/signup" render={() => <Signup setUser={setUser} />} />
          <Route path="/login" render={() => <Login setUser={setUser} />} />
          <Route path="/admin" render={() => <Admin setUser={setUser} />} />
          <Route
            path="/admin"
            render={() => <LoginAdmin setUser={setUser} />}
          />
            render={() => <LoginAdmin /* setAdmin={setAdmin}  *//>}
            
          />
          <Route path="/admin-courses" component={AdminCourses} />
          {/* Private routes when logged in*/}
          {/*  {user ? ( */}
          <>
            <Route path="/course" component={Course} />
            <Route path="/students" component={Students} />
            <Route
              path="/reviews"
              render={() => <Reviews admin={isUserAdmin} />}
            />
            <Route path="/navbar" component={Navbar} />
            <Route path="/mycourses" component={MyCourses} />
          </>
          {/* ) : (
            // If not logged in
            <Redirect to="/login" />
          )}
            */}
          {/* Catch all unmatched routes */}
          {/*  <Redirect to="/" />  */}
        </Switch>
      </main>
    </div>
  );
}

export default App;
