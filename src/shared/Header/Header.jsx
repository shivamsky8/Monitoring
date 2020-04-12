/* eslint-disable react/prefer-stateless-function */
import React from "react";
import "./Header.css";

export default class Header extends React.Component {
  navStatus = () => {
    this.props.navStatus();
  };
  render() {
    return (
      <>
        <header className="header-container">
          <span className="header-span" onClick={this.navStatus}>
            &#9776; Monitoring
          </span>
        </header>
      </>
    );
  }
}
