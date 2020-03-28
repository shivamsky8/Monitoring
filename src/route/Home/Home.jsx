import React from "react";
import axios from "axios";
import Strip from "../../shared/Strip/Strip";
import Header from "../../shared/Header/Header";
import SideNav from "../../shared/Sidenav/Sidenav";
import Statistics from "./Statistics/Statistics";
import MapView from "./MapView/MapView";
import "./Home.css";

export default class PersonList extends React.Component {
  state = {
    total: [],
    affectedCountries: [],
    selectedCountry: "World Wide",
    isLoading: false,
    isNavOpen: false,
    selectedMenu: 1
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
        "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
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

  navStatus = () => {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  };

  closeNav = () => {
    this.setState({ isNavOpen: false });
  };

  selectedItem = item => {
    this.closeNav();
    this.setState({ selectedMenu: item.id });
  };

  renderComponent = () => {
    const {
      total,
      affectedCountries,
      selectedCountry,
      isLoading,
      selectedMenu
    } = this.state;
    if (selectedMenu.name === 1) {
      return (
        <Statistics
          total={total}
          isLoading={isLoading}
          affectedCountries={affectedCountries}
          selectedCountry={selectedCountry}
          handleChange={this.handleChange}
        />
      );
    }
  };

  render() {
    const {
      isNavOpen,
      total,
      affectedCountries,
      selectedCountry,
      isLoading,
      selectedMenu
    } = this.state;
    return (
      <div
        className={`main-section ${isNavOpen ? "main-section-with-nav" : ""}`}
      >
        <Header navStatus={this.navStatus} />
        <SideNav
          isNavOpen={isNavOpen}
          closeSideNav={this.closeNav}
          selectedItem={this.selectedItem}
        />
        <div
          className={`home-wrapper ${isNavOpen ? "home-wrapper-opacity" : ""}`}
          onClick={this.closeNav}
        >
          {/* <div>
            <Strip stripText="COVID-19 CORONAVIRUS PANDEMIC" />
          </div> */}

          {selectedMenu === 1 && (
            <Statistics
              total={total}
              isLoading={isLoading}
              affectedCountries={affectedCountries}
              selectedCountry={selectedCountry}
              handleChange={this.handleChange}
            />
          )}
          {selectedMenu === 2 && <MapView />}
          {selectedMenu === 3 && <span>Symptom Checker</span>}
          {selectedMenu === 4 && <span>FAQ</span>}
          {selectedMenu === 5 && <span>Helpline</span>}
          {selectedMenu === 6 && <span>About</span>}
        </div>
      </div>
    );
  }
}
