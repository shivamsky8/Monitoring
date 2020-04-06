import React, { Component} from 'react'
import { createPortal } from "react-dom";
import {Map,TileLayer,Marker,Popup ,marker} from 'react-leaflet';
import {mapData} from './MapData';




 class MointoringMap extends Component {
    constructor(props) {
        super(props) ;
            this.state = {
                lat:  20.593684,
                lng: 78.96288,
                zoom: 13,
                mapData
            }
        }

         createMarker = (mapData) => { 
            let markerData = [];
            mapData.forEach((element)=>{
                let point = <Marker position={element.position} title={element.marker}> 
                <Popup>
                 {element.marker}</Popup></Marker>
                markerData.push(point)
            })
            return markerData;
        }

        render() {
            let url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            let attribution = ""
            const position = [this.state.lat,this.state.lng]
            
            return (
             <Map center={position} zoom={18} scrollWheelZoom={true}>
                <TileLayer
                 attribution={attribution}
                 url={url}
                 />      
                 {this.createMarker(this.state.mapData)}
            </Map>
            
        )
        }
    }

    
    export function LocalMap() {
        return <MointoringMap/>
    }
