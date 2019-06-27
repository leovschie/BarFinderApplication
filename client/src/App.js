import React, { Component } from "react";
import ApiForm from "./components/ApiForm";
import "./App.css";
import Results from "./components/Results";
import axios from "axios";
import Navigation from "./components/Navigation";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      users: []
    };
  }

  showBar = barResults => {
    this.setState({ result: barResults });
  };

  componentDidMount() {
    axios
      .get("/api/users")
      .then(resultsFromServer =>
        this.setState({ users: resultsFromServer.data })
      )
      .catch(error =>
        console.error(
          `Something went wrong when component mounted: ${error.stack}`
        )
      );
  }

  addUser = formState => {
    this.setState({ users: [...this.state.users, formState] });
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
