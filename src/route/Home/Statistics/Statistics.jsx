/* eslint-disable react/prefer-stateless-function */
import React from "react";
import PieChart from "../../../shared/PieChart/PieChart";
import InfoBox from "../../../shared/InfoBox/Infobox";
import Select from "react-select";

import "./Statistics.css";

export default class Statistics extends React.Component {
  handleChange = selectedOption => {
    this.props.handleChange(selectedOption);
  };
  render() {
    const { total, selectedCountry, affectedCountries } = this.props;

    const all = total.total_cases
      ? parseInt(total.total_cases.replace(",", ""))
      : 0;
    const death = total.total_deaths
      ? parseInt(total.total_deaths.replace(",", ""))
      : 0;
    const recover = total.total_recovered
      ? parseInt(total.total_recovered.replace(",", ""))
      : 0;
    const active = all - recover - death;
    const newCase = total.new_cases
      ? parseInt(total.new_cases.replace(",", ""))
      : 0;
    const newDeath = total.new_deaths
      ? parseInt(total.new_deaths.replace(",", ""))
      : 0;
    return (
      <>
        <div className="name-section">
          <span>{selectedCountry}</span>
          <div className="home-select">
            <Select
              onChange={this.handleChange}
              options={affectedCountries}
              placeholder={selectedCountry}
            />
          </div>
        </div>
        <div className="cases-section">
          <InfoBox
            header="Total Cases"
            count={total.total_cases}
            newCase={newCase}
          />
          <InfoBox
            header="Death"
            count={total.total_deaths}
            newCase={newDeath}
          />
          <InfoBox header="Recovered" count={total.total_recovered} />
        </div>
        <PieChart active={active} death={death} recover={recover} />
      </>
    );
  }
}
