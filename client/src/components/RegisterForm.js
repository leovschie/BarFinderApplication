import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import logo from "../images/borrle.gif";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("/register", user)
      .then(results => {
        this.props.addUser(this.state);
        this.setState({
          id: results.data.id,
          email: results.data.email,
          password: results.data.password,
          redirect: true
        });
      })
      .catch();
    window.location.reload();
  };

  render() {
    if (this.state.redirect) return <Redirect to="/" />;
    else
      return (
        <div className="centerText">
          <img alt="borrle logo" className="SmallLogoImg" src={logo} />
          <h1>sign up</h1>
          <form onSubmit={this.handleSubmit}>
            <div>
              <br />
              <input
                type="email"
                placeholder="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                autocomplete="off"
                required
              />
            </div>
            <div>
              <br />
              <input
                type="password"
                placeholder="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </div>
            <br />
            <input type="submit" value="create" />
          </form>
        </div>
      );
  }
}

export default RegisterForm;
