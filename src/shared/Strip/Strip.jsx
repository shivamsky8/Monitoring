/* eslint-disable react/prefer-stateless-function */
import React from "react";
import "./Strip.css";

const Strip = ({ stripText }) => (
  <div className="strip-wrapper">
    <span className="strip-text">{stripText}</span>
  </div>
);

export default Strip;
