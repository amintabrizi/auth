import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authCheckState } from './redux/actions/actions';
import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from "./containers/Dashboard";
import Home from "./containers/Home";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import Orders from "./containers/Orders";
import SignOut from "./containers/SignOut";

function App() {
  const login = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch])

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link className="nav-item nav-link active" to="/">Home</Link>
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
              <div className="right-nav d-flex">
                {login
                  ?
                  <Link className="nav-item nav-link text-white" to="/signout">SignOut</Link>
                  :
                  <>
                    <Link className="nav-item nav-link text-white" to="/signin">Signin</Link>
                    <Link className="nav-item nav-link text-white" to="/signup">Signup</Link>
                  </>
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
          <Route path="/signout">
            <SignOut />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router >
  );
}

export default App;
