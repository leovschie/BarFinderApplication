import React, { Component } from "react";
import axios from "axios";
import logo from "../images/borrle.gif";

class UserHistory extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [] };
  }
  getResults = () => {
    axios
      .post("/resulthistory")
      .then(results => {
        const resultshistory = results.data.map(result => {
          return {
            barname: result.barname,
            address: result.address
          };
        });
        this.setState({ results: resultshistory });
      })
      .catch(error =>
        console.error(
          `something went wrong with getting resulthistory: ${error.stack}`
        )
      );
  };
  componentDidMount() {
    this.getResults();
  }

  render() {
    const barNames = this.state.results.map((bar, index) => (
      <ul key={index}>
        <li className="barName">{bar.barname.toLowerCase()}</li>
        <li>{bar.address.toLowerCase()}</li>
      </ul>
    ));
    return (
      <div className="centerTextScroll">
        <img alt="borrle logo" className="SmallLogoImg" src={logo} />
        <h1>your past adventures took place here..</h1>
        {barNames}
      </div>
    );
  }
}

export default UserHistory;
