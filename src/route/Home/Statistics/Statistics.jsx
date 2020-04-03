/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PieChart from "../../../shared/PieChart/PieChart";
import InfoBox from "../../../shared/InfoBox/Infobox";
import Select from "react-select";

import "./Statistics.css";
import BarChart from "../../../shared/BarChart/BarChart";

class Statistics extends React.Component {
  handleChange = selectedOption => {
    this.props.handleChange(selectedOption);
  };
  render() {
    const {
      total,
      selectedCountry,
      affectedCountries,
      filteredStats
    } = this.props;

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

    console.log(filteredStats);

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
        <PieChart active={Math.abs(active)} death={death} recover={recover} />
        {selectedCountry !== "World Wide" && (
          <div className="bar-chart-section">
            <div className="first">
              <BarChart
                date={filteredStats.date}
                data={filteredStats.newCase}
                name={"New Cases"}
                style={400}
              />
            </div>
            <div className="second">
              <BarChart
                date={filteredStats.date}
                data={filteredStats.death}
                name={"New Deaths"}
                style={400}
              />
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  isMenuOpen: state.ui.menu.isOpen,
  selectedMenu: state.ui.menu.selectedMenu,
  affectedCountries: state.home.affectedCountries,
  total: state.home.worldWide,
  loader: state.ui.loader,
  filteredStats: state.home.filteredStats
});

const mapDispatchToProps = {
  // fetchCountryWiseStats
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Statistics)
);
