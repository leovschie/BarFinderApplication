import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Results from "./components/Results";
import LoginForm from "./components/LoginForm";
import SideBar from "./components/SideBar";
import ApiForm from "./components/ApiForm";
import RegisterForm from "./components/RegisterForm";
import LogOutButton from "./components/LogOutButton";

import UserHistory from "./components/UserHistory";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      users: []
    };
  }

  showBar = barResults => {
    this.setState({ result: barResults });
  };

  addUser = formState => {
    this.setState({ users: [...this.state.users, formState] });
  };

  render() {
    return (
      <div className="App">
        <SideBar />
        <Switch>
          <Route
            exact
            path="/"
            render={routeProps => <ApiForm showBar={this.showBar} />}
          />
          <Route path="/Login" component={LoginForm} />
          <Route
            path="/Register"
            render={routeProps => <RegisterForm addUser={this.addUser} />}
          />
          <Route path="/Logout" component={LogOutButton} />
          <Route
            path="/Results"
            render={routeProps => (
              <Results
                className="ResultsMainPage"
                results={this.state.result}
              />
            )}
          />
          <Route path="/resulthistory" component={UserHistory} />
        </Switch>
      </div>
    );
  }
}

export default App;
