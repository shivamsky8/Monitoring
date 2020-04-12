/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { about } from "../../../config/about";
import aboutUs from "./about.png";
import "./About.css";

export default class About extends React.Component {
  render() {
    return (
      <section className="about-main-section">
        <img src={aboutUs} height="140px" alt="About" />
        <div className="about-wrapper">
          {about.map((aItem) => (
            <div className="about-section-wrapper" key={aItem.id}>
              <div className="about-section-header">{aItem.title}</div>
              <div className="about-section-content">{aItem.description}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}
