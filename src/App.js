import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from "./containers/Dashboard";
import Home from "./containers/Home";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import Orders from "./containers/Orders";

function App() {
  const login = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-item nav-link active" to="/">Home</Link>
                {!login
                  ?
                  <>
                    <Link className="nav-item nav-link" to="/signin">signin</Link>
                    <Link className="nav-item nav-link" to="/signup">signup</Link>
                  </>
                  :
                  ''
                }


                {login
                  ?
                  <>
                    <Link className="nav-item nav-link" to="/dashboard">dashboard</Link>
                    <Link className="nav-item nav-link" to="/orders">orders</Link>
                  </>
                  :
                  ''
                }
              </div>
            </div>
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
