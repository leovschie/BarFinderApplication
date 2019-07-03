import React, { Component } from "react";

class Results extends Component {
  render() {
    const barResults = this.props.results.data;
    let barName, barUrl, barImg, barAddress, barPrice;
    for (let key in barResults) {
      if (barResults.hasOwnProperty(key)) {
        switch (key) {
          case "barName":
            barName = barResults[key].toLowerCase();
            break;

          case "barUrl":
            barUrl = barResults[key];
            break;

          case "barImg":
            barImg = barResults[key];
            break;

          case "barAddress":
            barAddress = barResults[key];
            break;

          case "barPrice":
            barPrice = barResults[key];
            break;

          default:
            break;
        }
      }
    }
    console.log("the bar", barName);
    console.log("the url", barUrl);
    console.log("the img", barImg);
    console.log("address", barAddress);
    console.log("the pricerange", barPrice);

    if (barResults) {
      return (
        <div className="centerText">
          <h1>see you at {barName}</h1>
          <img className="barImg" src={barImg} alt="Bar" />
          <p>{barAddress}</p>
          <p>{barPrice}</p>
          <a href={barUrl} target="_blank" rel="noopener noreferrer">
            read more
          </a>
        </div>
      );
    } else return null;
  }
}

export default Results;
