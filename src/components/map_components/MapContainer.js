import React from "react";
import {Map, Polyline, Marker, GoogleApiWrapper} from 'google-maps-react';
import getStyle from './MapStyles.js';
import getKey from 'ApiKey.js';
import * as cache from 'caches/routeCache/RouteCache'
import CustomLoader from 'components/generic_components/CustomLoader';

export class MapContainer extends React.Component {

  center={lat: 43.354854, lng: -5.851186}
  route = []
  zoom = 15
  
  setZoom(zoom) { this.zoom = zoom }
  
  render() {
    var stringRuta =  localStorage.getItem('route');
    var rutaSeleccionada;
    
    if(stringRuta!=null){
       rutaSeleccionada = JSON.parse(localStorage.getItem('route'));
       var puntos = rutaSeleccionada.geoCoordinates;
       var ruta = [];
    
      if(typeof(rutaSeleccionada) !== "undefined"){
        puntos.forEach((punto)=>{
          ruta.push({
            lat: parseFloat(punto.latitude),
            lng: parseFloat(punto.longitude)
          });
        })
       
       this.route = ruta;
      }
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

  render(){
    const {loading} = this.state;
    return(
      <React.Fragment>
        {loading ? <CustomLoader/> : this.viewLoaded(this.state.route)}
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (getKey()),
  language:"en-US"
})(MapContainer)
