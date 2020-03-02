import React from "react";
import {Map, GoogleApiWrapper} from 'google-maps-react';
import getStyle from './MapStyles.js';
import getKey from './ApiKey.js';

 
export class MapContainer extends React.Component {
  render() {
    return (
      <Map
		  google={this.props.google}
		  zoom={14}
		  styles={getStyle(1)}
		  streetViewControl={false}
		  mapTypeControl={false}
		  fullscreenControl={false}
		  zoomControl={false}
	  >
                
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (getKey()),
  language:"en-US"
})(MapContainer)
