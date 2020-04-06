/* eslint-disable react/prefer-stateless-function */
import React from "react";
import "./Card.css";
import RadioButton from "../RadioButton/RadioButton";

export default class Card extends React.Component {
  handleChange = type => {
    // this.props.onClickHandler()
    this.props.onClickAns(type);
  };
  render() {
    const { question } = this.props;
    return (
      <>
        <section className="card-wrapper">
          <div className="card">
            <h3 className="card-list__text"> {question.que}</h3>
          </div>
          <div className="card-radio-wrapper">
            <RadioButton
              checked={question.select}
              onSelectAns={this.handleChange}
            />
          </div>
        </section>
      </>
    );
  }
}
