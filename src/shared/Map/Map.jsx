import React, { Component } from "react";
import { Map, TileLayer, Popup, CircleMarker } from "react-leaflet";
import { mapData } from "./MapData";
import MapPopup from "../MapPopup/MapPopup";

class MointoringMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 20.593684,
      lng: 78.96288,
      zoom: 13,
      mapData,
      bounds: [
        [15.10666624, -20.6166642],
        [35.652832, 100.839478],
      ],
      toShow: {},
    };
  }

  createMarker = (mapData) => {
    let markerData = [];
    mapData.forEach((element) => {
      let point = (
        <CircleMarker
          key={element.marker}
          center={element.position}
          radius={5}
          fillOpacity={0.7}
          stroke={true}
          color={"red"}
        >
          <Popup>
            <MapPopup country={element.marker} />
          </Popup>
        </CircleMarker>
      );
      markerData.push(point);
    });
    return markerData;
  };

  handleMapClick = (e) => {};

  handlePopupOpen = (e) => {};

  render() {
    let url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    let attribution = "";
    const position = [this.state.lat, this.state.lng];
    const bounds = this.state.bounds;

    return (
      <Map
        center={position}
        zoom={30}
        scrollWheelZoom={true}
        bounds={bounds}
        onClick={this.handleMapClick}
        onPopupOpen={this.handlePopupOpen}
      >
        <TileLayer attribution={attribution} url={url} />
        {this.createMarker(this.state.mapData)}
      </Map>
    );
  }
}

export function LocalMap() {
  let MAP = MointoringMap;
  return <MAP />;
}
