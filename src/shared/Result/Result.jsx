/* eslint-disable react/prefer-stateless-function */
import React from "react";
import "./Result.css";

export default class Result extends React.Component {
  render() {
    const { type } = this.props;
    return (
      <>
        <div>
          <div className="check-process">
            {type ? (
              <div className="positive">
                Possibility of Virus Infection. Do not panic, Contact your
                family Physician or nearest hospital.
              </div>
            ) : (
              <div className="negative">
                No possibility of Infection. If you are not feeling well,
                Contact your family Physician or nearest hospital.
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
