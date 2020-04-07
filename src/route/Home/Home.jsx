import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  openMenu,
  closeMenu,
  SelectedMenuItem,
  loading,
  stopLoading,
} from "../../Module/ui.reducer";
import {
  fetchAffectedCountries,
  fetchWorldWide,
  fetchCountryWise,
  fetchCountryWiseStats,
} from "./homeReducer";
// import Strip from "../../shared/Strip/Strip";
import Header from "../../shared/Header/Header";
import SideNav from "../../shared/Sidenav/Sidenav";

import Statistics from "./Statistics/Statistics";
import SymptomChecker from "./SymptomChecker/SymptomChecker";

import httpClient from "../../utils/http-client";
import Loader from "../../shared/Loader/Loader";
import MapView from "./MapView/MapView";
import Faq from "./Faq/Faq";
import "./Home.css";
import Footer from "../../shared/Footer/Footer";

class Home extends React.Component {
  state = {
    selectedCountry: "World Wide",
  };

  UNSAFE_componentWillMount() {
    const self = this;
    httpClient.interceptors.request.use(
      function (config) {
        self.props.loading(true);
        return config;
      },
      function (error) {
        console.log("Home -> componentWillMount -> error", error);
        return Promise.reject(error);
      }
    );

    httpClient.interceptors.response.use(
      function (response) {
        self.props.stopLoading(false);
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  componentDidMount() {
    this.getWorldWide();
    this.props.fetchWorldWide();

    //affected countries
    this.props.fetchAffectedCountries();
    const name = "india";
  }

  getWorldWide = () => {
    this.props.fetchWorldWide();
  };

  getCountryWise = (countryName) => {
    this.props.fetchCountryWise(countryName);
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedCountry: selectedOption.value });
    if (selectedOption.value === "World Wide") {
      this.getWorldWide();
    } else {
      this.getCountryWise(selectedOption.value);
      this.props.fetchCountryWiseStats(selectedOption.value);
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

  selectedItem = (item) => {
    this.closeNav();
    // this.setState({ selectedMenu: item.id });
    this.props.SelectedMenuItem(item.id);
  };

  render() {
    const { selectedCountry } = this.state;
    const { isMenuOpen, selectedMenu, loader } = this.props;

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

        <div>
          {loader ? (
            <Loader />
          ) : (
            <div
              className={`home-wrapper ${
                isMenuOpen ? "home-wrapper-opacity" : ""
              }`}
              onClick={this.closeNav}
            >
              {/* <div>
                <Strip stripText="COVID-19 CORONAVIRUS PANDEMIC" />
              </div> */}

              {selectedMenu === 1 && (
                <Statistics
                  selectedCountry={selectedCountry}
                  handleChange={this.handleChange}
                />
              )}
              {selectedMenu === 2 && <MapView />}
              {selectedMenu === 3 && <SymptomChecker />}
              {selectedMenu === 4 && <Faq />}
              {selectedMenu === 5 && <span>Helpline</span>}
              {selectedMenu === 6 && <span>About</span>}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isMenuOpen: state.ui.menu.isOpen,
  selectedMenu: state.ui.menu.selectedMenu,
  affectedCountries: state.home.affectedCountries,
  total: state.home.worldWide,
  loader: state.ui.loader,
  filteredStats: state.home.filteredStats,
});

const mapDispatchToProps = {
  openMenu,
  closeMenu,
  SelectedMenuItem,
  fetchAffectedCountries,
  fetchWorldWide,
  fetchCountryWise,
  loading,
  stopLoading,
  fetchCountryWiseStats,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
