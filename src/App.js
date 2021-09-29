import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
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

  let rightNav = <Link className="nav-item nav-link active" to="/">Home</Link>;
  let leftNav = null;

  let routes = (
    <>
      <Route exact path="/">
        <Home />
      </Route>
      <Redirect to="/" />
    </>
  )


  if (login) {
    rightNav = (
      <>
        <Link className="nav-item nav-link active" to="/">Home</Link>
        <Link className="nav-item nav-link" to="/dashboard">dashboard</Link>
        <Link className="nav-item nav-link" to="/orders">orders</Link>
      </>
    );
    leftNav = <Link className="nav-item nav-link text-white" to="/signout">SignOut</Link>
    routes = (
      <>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/orders">
          <Orders />
        </Route>
        <Route path="/signout">
          <SignOut />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Redirect to="/" />
      </>
    )
  } else {
    leftNav = (
      <>
        <Link className="nav-item nav-link text-white" to="/signin">Signin</Link>
        <Link className="nav-item nav-link text-white" to="/signup">Signup</Link>
      </>
    )
    routes = (
      <>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Redirect to="/" />
      </>
    )
  }

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                {rightNav}
              </div>
              <div className="right-nav d-flex">
                {leftNav}
              </div>
            </div>
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {routes}
        </Switch>
      </div>
    </Router >
  );
}

export default App;
