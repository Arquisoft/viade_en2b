import React from "react";
import {Map, Polyline, Marker, GoogleApiWrapper} from 'google-maps-react';
import getStyle from './MapStyles.js';
import getKey from 'ApiKey.js';

 
export class MapContainer extends React.Component {

  
  rutaSeleccionada = JSON.parse(localStorage.getItem('route'));
  puntos  = this.rutaSeleccionada.geoCoordinates
 
  center={lat: 43.362448, lng: -5.849005}
  route = [{lat: 43.361778, lng: -5.848008}, {lat: 43.363836, lng: -5.851059}, {lat: 43.363174, lng: -5.852273}]
  zoom = 15
  
  setZoom(zoom) { this.zoom = zoom }
  
  render() {
    
    var ruta = [];
    if(typeof(this.rutaSeleccionada) !== "undefined"){
      this.puntos.forEach((punto)=>{
        ruta.push({
          lat: parseFloat(punto.latitude),
          lng: parseFloat(punto.longitude)
        });
        return;
      })
     console.log(ruta);
     console.log(this.route);
     this.route = ruta;

    }
    
    if(this.route.length!==0) {
      this.center=this.route[Math.floor(this.route.length/2)];
    }
    
    return ( <Map
      google={this.props.google}
      zoom={this.zoom}
      styles={getStyle(0)}
      streetViewControl={false}
      mapTypeControl={false}
      fullscreenControl={false}
      zoomControl={false}
      initialCenter={this.center}
    >
    <Polyline
      path={this.route}
      strokeColor="#717171"
      strokeOpacity={1}
      strokeWeight={0.4*this.zoom}
      
      />
      <Marker
        title={'Start of route'}
        name={'Start of route'}
        position={this.route[0]}
        opacity={1}
        icon={"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Media_Viewer_Icon_-_Location.svg/35px-Media_Viewer_Icon_-_Location.svg.png"}
      />
    </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (getKey()),
  language:"en-US"
})(MapContainer)
