import React, { Component } from "react";
import SideBar from "./components/SideBar";
import ApiForm from "./components/ApiForm";
import Results from "./components/Results";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Hello from Home!</h1>
        {/* 
        <ApiForm showBar={this.showBar} />
        <Results className="ResultsMainPage" results={this.state.result} />
        <RegisterForm addUser={this.addUser} />
        <LoginForm /> */}
      </div>
    );
  }
}

export default Home;
