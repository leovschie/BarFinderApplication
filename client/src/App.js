import React, { Component } from "react";
import ApiForm from "./components/ApiForm";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <h1>this is address one</h1>
        <AddressOne /> */}
        <ApiForm />
      </div>
    );
  }
}

export default App;
