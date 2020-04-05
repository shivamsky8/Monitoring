/* eslint-disable react/prefer-stateless-function */
import React from "react";
import {LocalMap} from '../../../shared/Map/Map'
import "./MapView.css";
//TODO : change pointer style and render second div if possible conditinally
//TODO : find the appropriate center so that whole world map can be seen 
//TODO : popup style can also be changes we can also implement handlers for click if needed 

export default class MapView extends React.Component {
  render() {
    return (
      <>
        {LocalMap()}
      </>
    );
  }
}
