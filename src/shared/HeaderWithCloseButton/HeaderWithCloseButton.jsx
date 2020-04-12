/* eslint-disable react/prefer-stateless-function */
import React from "react";
import "./HeaderWithCloseButton.css";

export default class HeaderWithCloseButton extends React.Component {
  closeSideNav = () => {
    this.props.closeSideNav();
  };
  render() {
    return (
      <>
        <header className="header-close-container">
          <span className="header-span-close">Menu</span>
          <i
            className="fa fa-close fa-icon-close"
            onClick={this.closeSideNav}
          ></i>
        </header>
      </>
    );
  }
}
