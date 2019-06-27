import React, { Component } from "react";
import ApiForm from "./components/ApiForm";
import "./App.css";
import Results from "./components/Results";
import Navigation from "./components/Navigation";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: []
    };
  }

  showBar = barResults => {
    this.setState({ result: barResults });
  };

  render() {
    return (
      <div className="App">
        <ApiForm showBar={this.showBar} />
        <Results className="ResultsMainPage" results={this.state.result} />
        {/* <Navigation /> */}
      </div>
    );
  }
}

export default App;
