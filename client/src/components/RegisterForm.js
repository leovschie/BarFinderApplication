//this form has its own state because when you make a new user you need to save it somehwere. So we're saving it in the state.
import React, { Component } from "react";
import axios from "axios";

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

    //this sends user to server in the backend
    axios
      .post("/register", user)
      .then(results => {
        //addUser that is passed down from App.js (react) for updating the state of app.js. So it is a prop in form that we get from
        // somewhere that holds addUser. In this addUser we are putting (this.state)
        this.props.addUser(this.state);
        this.setState({
          id: results.data.id,
          email: results.data.email,
          password: results.data.password,
          redirect: true
        });
      })
      .catch();
  };

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            {/* <label>Email:</label> */}
            <br />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <br />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <br />
          <input type="submit" value="Create" />
        </form>
      </div>
    );
  }
}

export default RegisterForm;
