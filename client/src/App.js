import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Results from "./components/Results";
import LoginForm from "./components/LoginForm";
import SideBar from "./components/SideBar";
import ApiForm from "./components/ApiForm";
import RegisterForm from "./components/RegisterForm";
import LogOutButton from "./components/LogOutButton";
import Home from "./Home";

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
        <LogOutButton />
        <Switch>
          <Route exact path="/Home" component={Home} />
          <Route path="/Login" component={LoginForm} />
          <Route path="/Register" component={RegisterForm} />
        </Switch>
        <ApiForm showBar={this.showBar} />
        <Results className="ResultsMainPage" results={this.state.result} />
        <RegisterForm addUser={this.addUser} />
        <LoginForm />
      </div>
    );
  }
}

export default App;
