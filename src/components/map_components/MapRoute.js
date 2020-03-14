import React from "react";
import {Polyline} from 'google-maps-react';


export default class MapRoute extends React.Component {
	
	constructor() {
		super()
		this.triangleCoords = [
			{lat: 37.759304, lng: -122.428093},
			{lat: 37.759304, lng: -122.628093},
			{lat: 37.459304, lng: -122.628093}
		  ];
	}
	
	render() {
	  return(
		<Polyline
		  paths={this.triangleCoords}
		  strokeColor="#FF0000"
		  strokeOpacity={1}
		  strokeWeight={2} />
		  
	  )
	}
}