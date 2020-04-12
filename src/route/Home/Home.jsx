import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
  openMenu,
  closeMenu,
  loading,
  stopLoading,
} from "../../Module/ui.reducer";
import {
  fetchAffectedCountries,
  fetchWorldWide,
  fetchCountryWise,
  fetchCountryWiseStats,
  fetchAllStats,
} from "./homeReducer";
import SideNav from "../../shared/Sidenav/Sidenav";
import Statistics from "./Statistics/Statistics";
import Helpline from "./Helpline/Helpline";
import About from "./About/About";
import SymptomChecker from "./SymptomChecker/SymptomChecker";
import httpClient from "../../utils/http-client";
import Loader from "../../shared/Loader/Loader";
import MapView from "./MapView/MapView";
import Faq from "./Faq/Faq";
import "./Home.css";

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
    const { history } = this.props;
    this.getWorldWide();
    this.props.fetchWorldWide();

    //affected countries
    this.props.fetchAffectedCountries();

    //All Data

    this.props.fetchAllStats();

    // small hack for routing
    if (history.location.pathname === "/") {
      history.push("home");
    }
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
    this.props.history.push(item.query);
  };

  render() {
    const { selectedCountry } = this.state;
    const { isMenuOpen, loader, history } = this.props;

    const { pathname } = history.location;

    return (
      <div
        className={`main-section ${isMenuOpen ? "main-section-with-nav" : ""}`}
      >
        <SideNav
          isNavOpen={isMenuOpen}
          closeSideNav={this.closeNav}
          selectedItem={this.selectedItem}
        />

        <div>
          <div
            className={` ${isMenuOpen ? "home-wrapper-opacity" : ""} ${
              pathname === "/map-view" ? "map-home-wrapper" : "home-wrapper"
            }`}
            onClick={this.closeNav}
          >
            {loader ? (
              <Loader />
            ) : (
              <>
                <Route path="/home">
                  <Statistics
                    selectedCountry={selectedCountry}
                    handleChange={this.handleChange}
                  />
                </Route>
                <Route path="/map-view" component={MapView} />
                <Route path="/faq" component={Faq} />
                <Route path="/symptom-checker" component={SymptomChecker} />
                <Route path="/helpline" component={Helpline} />
                <Route path="/about" component={About} />
                {/* <Redirect from="**" to="home" /> */}
              </>
            )}
          </div>
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
  fetchAffectedCountries,
  fetchWorldWide,
  fetchCountryWise,
  loading,
  stopLoading,
  fetchCountryWiseStats,
  fetchAllStats,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
