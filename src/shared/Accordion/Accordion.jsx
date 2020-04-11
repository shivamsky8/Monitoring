import React, { Component } from "react";
import "./Accordion.css";

export const Toggle = (props) => {
  return (
    <div className="toggable">
      <div className="toggable_heading" onClick={props.setActive}>
        <span>{props.title}</span>
        <i
          className={`fa ${
            props.active ? "fa-chevron-down" : "fa fa-chevron-right"
          }`}
        ></i>
      </div>
      {props.active ? (
        <div className="toggable_content">
          {props.subQuestion && (
            <span className="sub-question">{props.subQuestion}</span>
          )}
          {typeof props.answer === "string" ? (
            <span>{props.answer}</span>
          ) : (
            props.answer.map((answer, index) => (
              <div className="sub-answer">
                <span className="index-section">{index + 1}.</span>
                <span>{answer}</span>
              </div>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
};

export class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.activeDefault,
    };
  }

  setActive = (i) => {
    this.setState((oldState) => ({
      active: oldState.active === i ? null : i,
    }));
  };

  render() {
    const children = React.Children.map(this.props.children, (child, i) => {
      return React.cloneElement(child, {
        active: this.state.active === i,
        setActive: () => this.setActive(i),
      });
    });
    return <div className="accordion">{children}</div>;
  }
}
