import React, { Component } from "react";
// import ResultItem from "./ResultItem";
import axios from "axios";

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
        this.state.results.push(resultshistory);

        console.log(
          "-------this is the array of filtered results",
          resultshistory
        );
        console.log(
          "++++++and this is your state.results now",
          this.state.results
        );
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
    return (
      <div className="centerText">
        <h1>this is your barhopping history</h1>
        <ul>
          <p>
            {this.state.results.forEach(result => {
              return result.barname;
            })}
          </p>
        </ul>

        {/* {this.state.results.map(result => (
            <ResultItem key={result.id} result={result} />
          ))}
           */}
      </div>
    );
  }
}

export default UserHistory;
