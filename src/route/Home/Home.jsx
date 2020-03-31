import React from "react";
import axios from "axios";
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
    axios({
      method: "GET",
      url:
        "https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "4119bc4c72msh36fce24686527fbp136ec4jsnaa9b50e47841"
      }
    })
      .then(response => {
        const affectedCountries = [];
        response.data.affected_countries.forEach(element => {
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
    axios({
      method: "GET",
      url:
        "https://coronavirus-monitor.p.rapidapi.com/coronavirus/world_total_stat.php",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "4119bc4c72msh36fce24686527fbp136ec4jsnaa9b50e47841"
      }
    })
      .then(response => {
        this.setState({ total: response.data, isLoading: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getCountryWise = countryName => {
    axios({
      method: "GET",
      url:
        "https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "4119bc4c72msh36fce24686527fbp136ec4jsnaa9b50e47841"
      },
      params: {
        country: countryName
      }
    })
      .then(response => {
        console.log(response);
        this.setState({
          total: response.data.latest_stat_by_country[0],
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
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
