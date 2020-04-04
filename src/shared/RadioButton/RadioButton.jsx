/* eslint-disable react/prefer-stateless-function */
import React from "react";
import "./RadioButton.css";

export default class RadioButton extends React.Component {
  navStatus = () => {
    this.props.navStatus();
  };
  render() {
    const { checked } = this.props;
    return (
      <>
        <div className="radio-wrapper">
          <label className="container">
            Yes
            <input type="radio" checked={checked} name="radio" />
            <span className="checkmark"></span>
          </label>
          <label className="container">
            No
            <input type="radio" name="radio" />
            <span className="checkmark"></span>
          </label>
        </div>
      </>
    );
  }
}
