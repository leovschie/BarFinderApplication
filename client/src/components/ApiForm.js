import React, { Component } from "react";
import axios from "axios";

class ApiForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      addressOne: "",
      addressTwo: "",
      venueType: "bar",
      priceRange: "$,$$"
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
      .then(result => console.log(`Sent info from client to server: ${result}`))
      .catch(error =>
        console.error(
          `Something went wrong with sending from client to server: ${
            error.stack
          }`
        )
      );
  };

  // { addressOne, addressTwo, venueType, priceRange } = this.state;
  // alert(`Your registration detail: \n
  //          Address One: ${addressOne} \n
  //          Address Two: ${addressTwo} \n
  //          Venue Type: ${venueType} \n
  //          Price Range: ${priceRange}`);
  // };

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
          Previous
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
          Next
        </button>
      );
    }
    return null;
  }

  render() {
    return (
      <React.Fragment>
        <h1>borrle</h1>
        <p>Step {this.state.currentStep}</p>

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
      <label htmlFor="addressOne">Address One</label>
      <input
        className="form-control"
        id="addressOne"
        name="addressOne"
        type="text"
        placeholder="Enter First Address"
        value={props.addressOne}
        onChange={props.handleChange}
      />
      <label htmlFor="addressTwo">Address Two</label>
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
      Just drinks or drinks and a bite?
      <select
        className="form-control"
        value={props.venueType}
        onChange={props.handleChange}
        name="venueType"
      >
        <option value="bar">Drinks</option>
        <option value="bar,restaurant">Food and Drinks</option>
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
        <label htmlFor="priceRange">Price Range</label>
        <select
          className="form-control"
          id="priceRange"
          name="priceRange"
          placeholder="Enter Price Range"
          value={props.priceRange}
          onChange={props.handleChange}
        >
          <option value="$,$$">Cheap</option>
          <option value="$$,$$$">Medium</option>
          <option value="$$$,$$$$">Fancy</option>
        </select>
      </div>
      <button className="btn btn-success btn-block">meet up</button>
    </React.Fragment>
  );
}

export default ApiForm;
