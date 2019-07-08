import React, { Component } from "react";
import logo from "../images/borrle.gif";
import { Link } from "react-router-dom";

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
            barAddress = barResults[key].toLowerCase();
            break;

          case "barPrice":
            barPrice = barResults[key];
            break;

          default:
            break;
        }
      }
    }

    if (barResults) {
      return (
        <div className="centerText">
          <Link to="/" className="menu-item">
            <img alt="borrle logo" className="SmallLogoImg" src={logo} />
          </Link>
          <h1>
            see you at <span className="barName">{barName}</span>
          </h1>
          <img className="barImg" src={barImg} alt="Bar" />
          <p>{barAddress} amsterdam</p>
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
