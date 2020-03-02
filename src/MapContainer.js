import React from "react";
import {Map, GoogleApiWrapper} from 'google-maps-react';
import getStyle from './MapStyles.js';
 
export class MapContainer extends React.Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}
      
      styles={getStyle(1)}>
                
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBGN3ezdr4GrrSb2XitMq_T6uXSiB6D9uE"),
  language:"en-US"
})(MapContainer)
