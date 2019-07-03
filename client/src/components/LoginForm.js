import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
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
      .post("/login", user)
      .then(results => {
        this.setState({
          id: results.data.id,
          email: results.data.email,
          password: results.data.password,
          redirect: false
        });
        this.setRedirect();
        window.location.reload();
      })
      .catch(error =>
        console.error(
          `something went wrong with sending to backend ${error.stack}`
        )
      );
  };

  render() {
    if (this.state.redirect) return <Redirect to="/" />;
    else
      return (
        <div className="centerText">
          <h1>log in</h1>
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
            <input type="submit" value="log In" />
          </form>
        </div>
      );
  }
}

export default LoginForm;
