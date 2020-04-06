import React, { Component} from 'react'
import {Map,TileLayer,Popup,CircleMarker } from 'react-leaflet';
import { connect } from "react-redux";
import {setSelectedMapCountry} from '../../route/Home/homeReducer'
import {mapData} from './MapData';



 class MointoringMap extends Component {
    constructor(props) {
        super(props) ;
            this.state = {
                lat:  20.593684,
                lng: 78.96288,
                zoom: 13,
                mapData,
                bounds :[[15.10666624 ,-23.6166642],[35.652832,139.839478]]
            }
        }

         createMarker = (mapData) => { 
            let markerData = [];
            mapData.forEach((element)=>{
                let point = <CircleMarker key={element.marker} center={element.position} radius={5} fillOpacity={0.7}
                stroke={true} color={"red"}> 
                <Popup>
                 {element.marker}</Popup></CircleMarker>
                markerData.push(point)
            })
            return markerData;
        }

        handleMapClick = (e) => {
            console.log(e.latlng , "latlng")
        }

        handlePopupOpen = (e) => {
            let countryName = e.popup.options.children;
            this.props.setSelectedMapCountry(countryName)
        }

        render() {
            let url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            let attribution = ""
            const position = [this.state.lat,this.state.lng]
            const bounds = this.state.bounds
            
            return (
             <Map center={position} zoom={18} scrollWheelZoom={true} bounds={bounds} onClick={this.handleMapClick} whenReady={()=>console.log("map is ready")}
             onPopupOpen={this.handlePopupOpen}>
                <TileLayer
                 attribution={attribution}
                 url={url}
                 />      
                 {this.createMarker(this.state.mapData)}
            </Map>
            
        )
        }
    }

    const mapDispatchToProps = {
        setSelectedMapCountry
      };
    
    export function LocalMap() {
        let MAP=  connect(null, mapDispatchToProps)(MointoringMap)
        return <MAP/>;
    }
