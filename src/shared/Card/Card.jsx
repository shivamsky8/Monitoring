/* eslint-disable react/prefer-stateless-function */
import React from "react";
import "./Card.css";
import RadioButton from "../RadioButton/RadioButton";

export default class Card extends React.Component {
  render() {
    const { question } = this.props;
    return (
      <>
        <section className="card-wrapper">
          <div class="card">
            <h3 class="card-list__text"> {question}</h3>
          </div>
          <div className="card-radio-wrapper">
            <RadioButton checked="true" />
          </div>
        </section>
      </>
    );
  }
}
