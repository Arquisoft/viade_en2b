import React from "react";
import {Map, Polyline, Marker, GoogleApiWrapper} from 'google-maps-react';
import getStyle from './MapStyles.js';
import getKey from 'ApiKey.js';
import * as cache from 'caches/routeCache/RouteCache'
import CustomLoader from 'components/generic_components/CustomLoader';

import ConfigCache from 'caches/ConfigCache.js'

export class MapContainer extends React.Component {

  constructor(props){
      super(props);
  
  this.state = {
    loading: true,
    route: "",
    dark: ConfigCache.dark,
    };
  }
  
  center={lat: 43.362448, lng: -5.849005}
  route = []
  //{lat: 43.361778, lng: -5.848008}, {lat: 43.363836, lng: -5.851059}, {lat: 43.363174, lng: -5.852273}
  zoom = 15
  
  setZoom(zoom) { this.zoom = zoom }
  
  componentDidMount() {
    let rutita = cache.default.getSelected()
    this.setState({ loading: false, route: rutita, dark: ConfigCache.dark});
  }

  
  viewLoaded = (route, dark) => {
    var ruta = [];
    if(route){
      var puntos = route.geoCoordinates;
      puntos.forEach((punto)=>{
        ruta.push({
          lat: parseFloat(punto.latitude),
          lng: parseFloat(punto.longitude)
        });
      })
     
     route = ruta;
  
    }else{
     route =  this.route;
    }
    
    if(route.length!==0) {
      this.center=route[Math.floor(route.length/2)];
    }
    
    return ( <Map
      google={this.props.google}
      zoom={this.zoom}
      styles={getStyle(dark)}
      streetViewControl={false}
      mapTypeControl={false}
      fullscreenControl={false}
      zoomControl={false}
      initialCenter={this.center}
    >
    <Polyline
      path={route}
      strokeColor="#717171"
      strokeOpacity={1}
      strokeWeight={0.4*this.zoom}
      
      />
      <Marker
        title={'Start of route'}
        name={'Start of route'}
        position={route[0]}
        opacity={1}
        icon={"https://arquisoft.github.io/viade_en2b/ViaDeSmall.png"}
      />
    </Map>
    );
  }

  render(){
    const {loading} = this.state;
    
    return (
    <React.Fragment>
      {
        loading ? <CustomLoader/> : this.viewLoaded(this.state.route, this.state.dark)
      }
    </React.Fragment>
    );
    
  }
}

export default GoogleApiWrapper({
  apiKey: (getKey()),
  language:"en-US"
})(MapContainer)
