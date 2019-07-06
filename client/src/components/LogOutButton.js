import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import logo from "../images/borrle.gif";

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
        console.log(`user successfully logged out: ${results}`);
      })
      .catch(error => {
        console.error(`error logging out: ${error.stack}`);
        window.location.reload();
      });

    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) return <Redirect to="/" />;
    else
      return (
        <div className="centerText">
          <img alt="borrle logo" className="SmallLogoImg" src={logo} />
          <form onSubmit={this.logOut.bind(this)}>
            <input
              className="logOutButton"
              type="submit"
              value="click here to log out"
            />
          </form>
        </div>
      );
  }
}

export default LogOutButton;
