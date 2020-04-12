/* eslint-disable react/prefer-stateless-function */
import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./MapPopup.css";

class MapPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      toShow: {},
    };
  }

  componentDidMount() {
    const { country, allStats } = this.props;
    allStats.forEach((aData) => {
      if (country === aData.country_name) {
        this.setState({ toShow: aData });
      }
    });
  }
  render() {
    const { toShow } = this.state;

    return (
      <>
        <section>
          <div className="popup-country">{toShow.country_name}</div>
          <div className="popup-flex">
            <span> Cases:</span>
            <span className="cases-popup"> {toShow.cases}</span>
          </div>
          <div className="popup-flex">
            <span> Death:</span>
            <span className="death-popup"> {toShow.deaths}</span>
          </div>
          <div className="popup-flex">
            <span>Recover:</span>
            <span className="recovered-popup"> {toShow.total_recovered}</span>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  allStats: state.home.allStats,
});

const mapDispatchToProps = {};

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(MapPopup)
// );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MapPopup)
);
