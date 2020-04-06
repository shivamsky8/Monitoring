/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {LocalMap} from '../../../shared/Map/Map'
import {fetchCountryWise , fetchCountryWiseStats} from '../homeReducer'
import "./MapView.css";

//TODO : this time popup is not visible need to know functionality data should be shown on popup open or close currently it is open 
//TODO : need to reduce the re rendering of map component 

 class MapView extends React.Component {
   constructor(props) {
     super(props)
     this.state = {
       
     }
   }

   componentDidUpdate(prevProps) {
     if (prevProps.country != this.props.country) {
       let country = this.props.country
       this.props.fetchCountryWise(country);
       this.props.fetchCountryWiseStats(country);
     }
    
   }
  render() {
   let {total} = this.props
    return (
      <>
       {LocalMap()}
       <span> Name : {total.country_name ?? 'Worldwide'}</span>
       <span> Total : {total.total_cases}</span>
       <span> Death  : {total.total_deaths}</span>
       <span> Recovered  : {total.total_recovered}</span>
      </>
    );
  }
}
const mapStateToProps = state => ({
  country : state.home.mapCountry,
  total: state.home.worldWide,
  filteredStats: state.home.filteredStats
  
});

const mapDispatchToProps = {
  fetchCountryWise,
  fetchCountryWiseStats
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MapView))


