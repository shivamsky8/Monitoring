/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { Accordion, Toggle } from "../../../shared/Accordion/Accordion.jsx";
import Strip from "../../../shared/Strip/Strip";
import { faqData } from "../../../config/faq";
import "./Faq.css";

export default class Faq extends React.Component {
  render() {
    console.log(faqData);

    return (
      <>
        <Strip stripText="FAQs Related to COVID-19 Corona Virus" />
        <div className="faq-wrapper">
          <div className="accordion-section">
            <Accordion>
              {faqData.map(aData => (
                <Toggle
                  title={aData.question}
                  answer={aData.answer}
                  subQuestion={aData.sub_question}
                ></Toggle>
              ))}
            </Accordion>
          </div>
          {/* <div className="form-section">Question section</div> */}
        </div>
      </>
    );
  }
}
