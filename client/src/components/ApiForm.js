import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import logo from "../images/borrle.gif";

class ApiForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      addressOne: "",
      addressTwo: "",
      venueType: "bars",
      priceRange: 2,
      redirect: false
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const formData = {
      addressOne: this.state.addressOne,
      addressTwo: this.state.addressTwo,
      venueType: this.state.venueType,
      priceRange: this.state.priceRange
    };

    axios
      .post("/api/formdata", formData)
      .then(resultsFromServer => {
        this.props.showBar(resultsFromServer);
        console.log("this is the barresult", this.props.results);
      })
      .catch(error =>
        console.error(
          `Something went wrong with sending from client to server: ${
            error.stack
          }`
        )
      );

    this.setRedirect();
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 3 ? 4 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
  };

  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button className="buttonLeft" type="button" onClick={this._prev}>
          back
        </button>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 4) {
      return (
        <button className="buttonRight" type="button" onClick={this._next}>
          next
        </button>
      );
    }
    return null;
  }

  render() {
    if (this.state.redirect) return <Redirect to="/results" />;
    else
      return (
        <div className="apiForm">
          <div className="centerText">
            <div className="headerHome">
              <img alt="borrle logo" className="logoImg" src={logo} />
              <h2 className="fit">your night out starts here..</h2>
            </div>
            <form onSubmit={this.handleSubmit}>
              <Step1
                currentStep={this.state.currentStep}
                handleChange={this.handleCange}
              />
              <Step2
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                addressOne={this.state.addressOne}
                addressTwo={this.state.addressTwo}
              />
              <Step3
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                venueType={this.state.venueType}
              />
              <Step4
                currentStep={this.state.currentStep}
                handleChange={this.handleChange}
                priceRange={this.state.priceRange}
              />

              {this.previousButton()}
              {this.nextButton()}
            </form>
          </div>
        </div>
      );
  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null;
  }
  return null;
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <div className="form-group">
      <div className="textForm">
        <h3>
          do you feel like going out tonight but don’t know where to go? no
          worries, we've got you covered. we'll set you up with the perfect bar
          or restaurant in the perfect location. for starters, fill us in on
          your location:
          <span htmlFor="addressOne" />
          <input
            className="form-control"
            id="addressOne"
            name="addressOne"
            type="text"
            placeholder="                            "
            autoComplete="off"
            value={props.addressOne}
            onChange={props.handleChange}
          />
          . now, enter your friend's address: <span htmlFor="addressTwo" />
          <input
            className="form-control"
            id="addressTwo"
            name="addressTwo"
            type="text"
            automplete="off"
            placeholder="                            "
            value={props.addressTwo}
            onChange={props.handleChange}
          />
          . click next to customize your plans a bit more.
        </h3>
      </div>
    </div>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null;
  }
  return (
    <div className="selectdiv">
      <label htmlFor="venueType"> </label>
      <div className="textForm">
        <h3>
          okay, next question: are you in for just drinks, or feeling a little
          hungry as well?
        </h3>
        <select
          className="form-control"
          value={props.venueType}
          onChange={props.handleChange}
          name="venueType"
        >
          <option value="bars">just drinks</option>
          <option value="restaurants">i'm hungry!</option>
        </select>
      </div>
    </div>
  );
}

function Step4(props) {
  if (props.currentStep !== 4) {
    return null;
  }
  return (
    <div className="form">
      <div className="form-group">
        <div className="custom-select">
          <label htmlFor="priceRange" />
          <div className="textForm">
            <h3>one last thing: how are you feeling budget-wise?</h3>

            <select
              className="form-control"
              id="priceRange"
              name="priceRange"
              placeholder="money mood?"
              value={props.priceRange}
              onChange={props.handleChange}
            >
              <option value="1">tight</option>
              <option value="2">i'm okay</option>
              <option value="3">feeling fancy</option>
            </select>
          </div>
        </div>
      </div>
      <button className="submitButton">let's go!</button>
    </div>
  );
}

export default ApiForm;
