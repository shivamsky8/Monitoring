/* eslint-disable react/prefer-stateless-function */
import React from "react";
import "./RadioButton.css";

export default class RadioButton extends React.Component {
  navStatus = () => {
    this.props.navStatus();
  };

  onClickHandler = type => {
    this.props.onSelectAns(type);
  };

  render() {
    const { checked } = this.props;
    return (
      <>
        <div className="radio-wrapper">
          <div
            className={`${checked ? "" : "selected"} container`}
            onClick={() => this.onClickHandler("no")}
          >
            <i className="fa fa-times"></i>
            <span>No</span>
          </div>
          <div
            className={`${checked ? "selected" : ""} container`}
            onClick={() => this.onClickHandler("yes")}
          >
            <i className="fa fa-check"></i>
            <span className="">Yes</span>
          </div>
        </div>
      </>
    );
  }
}
