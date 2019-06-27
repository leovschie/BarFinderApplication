import React, { Component } from "react";
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import App from "../App";
import Results from "./Results";
import Login from "./Login";

class Navigation extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h2>Welcome to React Router Tutorial</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li>
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to={"/results"} className="nav-link">
                  Results
                </Link>
              </li>
              <li>
                <Link to={"/about"} className="nav-link">
                  About
                </Link>
              </li>
            </ul>
          </nav>
          <hr />
          <Switch>
            <Route exact path="/home" component={App} />
            <Route path="/results" component={Results} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default Navigation;
