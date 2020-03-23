/* eslint-disable react/prefer-stateless-function */
import React from "react";
import "./Header.css";

export default class Header extends React.Component {
  render() {
    return (
      <>
        <header className="header-container">
          <span className="header-span">Monitoring</span>
        </header>
      </>
    );
  }
}
