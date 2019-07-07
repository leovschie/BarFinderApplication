import React, { Component } from "react";
import { stack as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import axios from "axios";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  componentDidMount() {
    axios
      .get("/home")
      .then(results => {
        this.setState({ loggedIn: results.data });
      })
      .catch(error => {
        console.error(
          `something went wrong with conditional rendering ${error.stack}`
        );
      });
  }

  render() {
    if (this.state.loggedIn === false) {
      return (
        <Menu>
          <Link to="/" className="menu-item">
            home
          </Link>
          <Link to="/Login" className="menu-item">
            log in
          </Link>
          <Link to="/Register" className="menu-item">
            sign up
          </Link>
        </Menu>
      );
    } else {
      return (
        <Menu>
          <Link to="/" className="menu-item">
            home
          </Link>
          <Link to="/resulthistory" className="menu-item">
            past adventures
          </Link>
          <Link to="/Map" className="menu-item">
            map
          </Link>
          <Link to="/Logout" className="menu-item">
            log out
          </Link>
        </Menu>
      );
    }
  }
}

export default SideBar;
