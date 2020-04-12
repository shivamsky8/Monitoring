/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { LocalMap } from "../../../shared/Map/Map";
import "./MapView.css";

//TODO : this time popup is not visible need to know functionality data should be shown on popup open or close currently it is open
//TODO : need to reduce the re rendering of map component

class MapView extends React.Component {
  render() {
    return <>{LocalMap()}</>;
  }
}

export default MapView;
