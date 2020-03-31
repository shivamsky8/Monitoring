import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { openMenu, closeMenu, SelectedMenuItem } from "../../Module/ui.reducer";
import {
  fetchAffectedCountries,
  fetchWorldWide,
  fetchCountryWise
} from "./homeReducer";
import Strip from "../../shared/Strip/Strip";
import Header from "../../shared/Header/Header";
import SideNav from "../../shared/Sidenav/Sidenav";
import Statistics from "./Statistics/Statistics";
import MapView from "./MapView/MapView";
import "./Home.css";

class Home extends React.Component {
  state = {
    selectedCountry: "World Wide"
  };

  componentDidMount() {
    this.getWorldWide();
    this.props.fetchWorldWide();

    //affected countries
    this.props.fetchAffectedCountries();
  }

  getWorldWide = () => {
    this.props.fetchWorldWide();
  };

  getCountryWise = countryName => {
    this.props.fetchCountryWise(countryName);
  };

  handleChange = selectedOption => {
    this.setState({ selectedCountry: selectedOption.value });
    if (selectedOption.value === "World Wide") {
      this.getWorldWide();
    } else {
      this.getCountryWise(selectedOption.value);
    }
  };

  navStatus = () => {
    const { isMenuOpen } = this.props;
    if (isMenuOpen) {
      this.props.closeMenu();
    } else {
      this.props.openMenu();
    }
  };

  closeNav = () => {
    this.props.closeMenu();
  };

  selectedItem = item => {
    this.closeNav();
    // this.setState({ selectedMenu: item.id });
    this.props.SelectedMenuItem(item.id);
  };

  render() {
    const { selectedCountry } = this.state;
    const { isMenuOpen, selectedMenu, affectedCountries, total } = this.props;
    return (
      <div
        className={`main-section ${isMenuOpen ? "main-section-with-nav" : ""}`}
      >
        <Header navStatus={this.navStatus} />

        <SideNav
          isNavOpen={isMenuOpen}
          closeSideNav={this.closeNav}
          selectedItem={this.selectedItem}
        />
        <div
          className={`home-wrapper ${isMenuOpen ? "home-wrapper-opacity" : ""}`}
          onClick={this.closeNav}
        >
          {/* <div>
            <Strip stripText="COVID-19 CORONAVIRUS PANDEMIC" />
          </div> */}

          {selectedMenu === 1 && (
            <Statistics
              total={total}
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

const mapStateToProps = state => ({
  isMenuOpen: state.ui.menu.isOpen,
  selectedMenu: state.ui.menu.selectedMenu,
  affectedCountries: state.home.affectedCountries,
  total: state.home.worldWide
});

const mapDispatchToProps = {
  openMenu,
  closeMenu,
  SelectedMenuItem,
  fetchAffectedCountries,
  fetchWorldWide,
  fetchCountryWise
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
