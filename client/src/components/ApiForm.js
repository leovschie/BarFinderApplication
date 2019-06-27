import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class ApiForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      addressOne: "",
      addressTwo: "",
      venueType: "bar",
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
    console.log(formData);

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
    {
      this.setRedirect();
    }
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/results" />;
    }
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
          &lt;&lt;
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
          &gt;&gt;
        </button>
      );
    }
    return null;
  }

  render() {
    if (this.state.redirect) return <Redirect to="/results" />;
    else
      return (
        <React.Fragment>
          <h1>borrle</h1>
          <form onSubmit={this.handleSubmit}>
            {/* 
          render the form steps and pass required props in
        */}
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
        </React.Fragment>
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
        placeholder="Enter First Address"
        value={props.addressOne}
        onChange={props.handleChange}
      />
      <label htmlFor="addressTwo" />
      <input
        className="form-control"
        id="addressTwo"
        name="addressTwo"
        type="text"
        placeholder="Enter Second Address"
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
    <div className="form-group">
      <label htmlFor="venueType"> </label>
      <p>in the mood for</p>
      <select
        className="form-control"
        value={props.venueType}
        onChange={props.handleChange}
        name="venueType"
      >
        <option value="bars">Drinks</option>
        <option value="restaurant">Food and Drinks</option>
      </select>
    </div>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="form-group">
        <div className="custom-select">
          <label htmlFor="priceRange">Price Range</label>
          <select
            className="form-control"
            id="priceRange"
            name="priceRange"
            placeholder="Enter Price Range"
            value={props.priceRange}
            onChange={props.handleChange}
          >
            <option value="1">Cheap</option>
            <option value="2">Medium</option>
            <option value="3">Fancy</option>
          </select>
        </div>
      </div>
      <button className="btn btn-success btn-block">meet up</button>
    </React.Fragment>
  );
}

export default ApiForm;
