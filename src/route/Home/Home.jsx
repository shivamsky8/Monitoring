import React from "react";
import Strip from "../../shared/Strip/Strip";
import InfoBox from "../../shared/InfoBox/Infobox";
import Select from "react-select";
import PieChart from "../../shared/PieChart/PieChart";
import "./Home.css";

export default class PersonList extends React.Component {
  state = {
    total: [],
    affectedCountries: [],
    selectedCountry: "World Wide",
    isLoading: false
  };

  componentDidMount() {
    this.getWorldWide();

    //affected countries
    this.getAffectedCountry();
  }

  getAffectedCountry = () => {
    fetch("http://localhost:8000/rest/v1/affected-country")
      .then(res => res.json())
      .then(data => {
        const affectedCountries = [];
        data.affected_countries.forEach(element => {
          affectedCountries.push({ value: element, label: element });
        });
        affectedCountries.push({ value: "World Wide", label: "World Wide" });
        this.setState({ affectedCountries });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getWorldWide = () => {
    fetch("http://localhost:8000/rest/v1/get")
      .then(res => res.json())
      .then(data => {
        console.log("PersonList -> getWorldWide -> data", data);
        this.setState({ total: data, isLoading: false });
      })
      .catch(err => console.log(err));
  };

  getCountryWise = countryName => {
    fetch(`http://localhost:8000/rest/v1/country-wise?country=${countryName}`)
      .then(res => res.json())
      .then(data => {
        console.log("PersonList -> getWorldWide -> data", data);
        this.setState({
          total: data.latest_stat_by_country[0],
          isLoading: false
        });
      })
      .catch(err => console.log(err));
  };

  handleChange = selectedOption => {
    this.setState({ isLoading: true, selectedCountry: selectedOption.value });
    if (selectedOption.value === "World Wide") {
      this.getWorldWide();
    } else {
      this.getCountryWise(selectedOption.value);
    }
  };

  render() {
    const { total, affectedCountries, selectedCountry, isLoading } = this.state;
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
      <div className="home-wrapper">
        <div>
          <Strip stripText="COVID-19 CORONAVIRUS PANDEMIC" />
        </div>
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
        {isLoading ? (
          <div id="loader"></div>
        ) : (
          <>
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
        )}
      </div>
    );
  }
}
