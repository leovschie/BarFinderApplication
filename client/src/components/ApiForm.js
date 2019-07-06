import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import logo from "../images/borrle.gif";
import next from "../images/right-arrow.png";
import previous from "../images/left-arrow.png";

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
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
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
        <button
          className="btn btn-secondary"
          type="button"
          onClick={this._prev}
        >
          <img alt="arrow" className="arrow" src={previous} />
        </button>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 3) {
      return (
        <button
          className="btn btn-primary float-right"
          type="button"
          onClick={this._next}
        >
          <img alt="arrow" className="arrow" src={next} />
        </button>
      );
    }
    return null;
  }

  render() {
    if (this.state.redirect) return <Redirect to="/results" />;
    else
      return (
        <div className="centerText">
          <div className="headerHome">
            <img alt="borrle logo" className="logoImg" src={logo} />
            <h2 className="fit">your night out starts here..</h2>
          </div>
          <form onSubmit={this.handleSubmit}>
            <Step1
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
              addressOne={this.state.addressOne}
              addressTwo={this.state.addressTwo}
            />
            <Step2
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
              venueType={this.state.venueType}
            />
            <Step3
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
              priceRange={this.state.priceRange}
            />
            {this.previousButton()}
            {this.nextButton()}
          </form>
        </div>
      );
  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <div className="form-group">
      <label htmlFor="addressOne" />
      <input
        className="form-control"
        id="addressOne"
        name="addressOne"
        type="text"
        placeholder="where u at?"
        autoComplete="off"
        value={props.addressOne}
        onChange={props.handleChange}
      />
      <label htmlFor="addressTwo" />
      <input
        className="form-control"
        id="addressTwo"
        name="addressTwo"
        type="text"
        automplete="off"
        placeholder="and ur friend?"
        value={props.addressTwo}
        onChange={props.handleChange}
      />
    </div>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <div className="selectdiv">
      <label htmlFor="venueType"> </label>
      <h3>belly mood?</h3>
      <select
        className="form-control"
        value={props.venueType}
        onChange={props.handleChange}
        name="venueType"
      >
        <option value="bars">drinks</option>
        <option value="restaurants">food and drinks</option>
      </select>
    </div>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null;
  }
  return (
    <div className="form">
      <div className="form-group">
        <div className="custom-select">
          <label htmlFor="priceRange">
            <h3>wallet mood?</h3>
          </label>
          <select
            className="form-control"
            id="priceRange"
            name="priceRange"
            placeholder="money mood?"
            value={props.priceRange}
            onChange={props.handleChange}
          >
            <option value="1">cheap</option>
            <option value="2">medium</option>
            <option value="3">fancy</option>
          </select>
        </div>
      </div>
      <button className="btn btn-success btn-block">let's go!</button>
    </div>
  );
}

export default ApiForm;
