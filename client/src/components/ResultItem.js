import React, { Component } from "react";

class ResultItem extends Component {
  render() {
    return (
      <div>
        <p>{this.state.results.barname}</p>
        <p>{this.state.results.address}</p>
        <br />
      </div>
    );
  }
}

export default ResultItem;
