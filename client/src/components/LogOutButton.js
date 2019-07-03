import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import UserHistory from "./UserHistory";

class LogOutButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  logOut = e => {
    e.preventDefault();
    axios
      .get("/logout")
      .then(results => {
        if (results === true) {
          this.setState({
            redirect: true
          });
        } else {
          console.log(`Something is not working babe`);
        }
      })
      .catch(error => {
        console.error(`error logging out: ${error.stack}`);
      });
  };

  render() {
    if (this.state.redirect) return <Redirect to="/" />;
    else
      return (
        <div className="centerText">
          <form className="logOutButton" onSubmit={this.logOut.bind(this)}>
            <input type="submit" value="log out" />
          </form>
          <UserHistory />
        </div>
      );
  }
}

export default LogOutButton;
