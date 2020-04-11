/* eslint-disable react/prefer-stateless-function */
import React from "react";
import Strip from "../Strip/Strip";
import "./Infobox.css";

const border = {
  "Total Cases": "cases-border",
  Death: "death-border",
  Recovered: "recover-border",
};

const InfoBox = ({ header, count, newCase }) => (
  <div className={`infobox-wrapper ${border[header]}`}>
    <Strip stripText={header} />
    <div className="infobox-count">
      <span className="infobox-count-span">{count ? count : 0}</span>
      {newCase > 0 && (
        <div className="infobox-icon-wrapper">
          <i className="fa fa-angle-double-up icon-size-increment"></i>

          <span className="infobox-new-case-span">{newCase}</span>
        </div>
      )}
    </div>
  </div>
);

export default InfoBox;
