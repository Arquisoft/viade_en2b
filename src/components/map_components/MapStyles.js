export default getStyle

  function getStyle(mode)
  {
    if(!mode)
      return [
	{
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#ebebeb"
		  }
		]
	  },
	  {
		"elementType": "labels.icon",
		"stylers": [
		  {
			"visibility": "on"
		  }
		]
	  },
	  {
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#616161"
		  }
		]
	  },
	  {
		"elementType": "labels.text.stroke",
		"stylers": [
		  {
			"color": "#f5f5f5"
		  }
		]
	  },
	  {
		"featureType": "administrative.land_parcel",
		"elementType": "labels",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "administrative.land_parcel",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#bdbdbd"
		  }
		]
	  },
	  {
		"featureType": "administrative.locality",
		"stylers": [
		  {
			"color": "#9e9e9e"
		  },
		  {
			"visibility": "simplified"
		  }
		]
	  },
	  {
		"featureType": "administrative.neighborhood",
		"elementType": "labels.text",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "poi",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#eeeeee"
		  }
		]
	  },
	  {
		"featureType": "poi",
		"elementType": "labels.icon",
		"stylers": [
		  {
			"saturation": -70
		  }
		]
	  },
	  {
		"featureType": "poi",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#757575"
		  }
		]
	  },
	  {
		"featureType": "poi.attraction",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "poi.business",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "poi.park",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#c7e2c7"
		  }
		]
	  },
	  {
		"featureType": "poi.park",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#9e9e9e"
		  }
		]
	  },
	  {
		"featureType": "poi.place_of_worship",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "poi.school",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#ffffff"
		  },
		  {
			"visibility": "simplified"
		  }
		]
	  },
	  {
		"featureType": "road",
		"elementType": "labels.icon",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "road",
		"elementType": "labels.text",
		"stylers": [
		  {
			"visibility": "on"
		  }
		]
	  },
	  {
		"featureType": "road.arterial",
		"elementType": "labels.icon",
		"stylers": [
		  {
			"saturation": -75
		  }
		]
	  },
	  {
		"featureType": "road.arterial",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#757575"
		  }
		]
	  },
	  {
		"featureType": "road.highway",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#dadada"
		  }
		]
	  },
	  {
		"featureType": "road.local",
		"elementType": "labels",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "road.local",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#9e9e9e"
		  },
		  {
			"visibility": "on"
		  }
		]
	  },
	  {
		"featureType": "road.local",
		"elementType": "labels.text.stroke",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "transit",
		"stylers": [
		  {
			"saturation": -75
		  },
		  {
			"lightness": 20
		  },
		  {
			"visibility": "on"
		  }
		]
	  },
	  {
		"featureType": "transit.line",
		"stylers": [
		  {
			"color": "#e2e2e2"
		  },
		  {
			"weight": 0.5
		  }
		]
	  },
	  {
		"featureType": "transit.station.airport",
		"elementType": "labels",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "transit.station.bus",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "water",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#bfdcf9"
		  }
		]
	  },
	  {
		"featureType": "water",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#9e9e9e"
		  }
		]
	  }
	];
		
		else {
		  return [
	  {
		"elementType": "labels.icon",
		"stylers": [
		  {
			"visibility": "on"
		  }
		]
	  },
	  {
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#000000"
		  },
		  {
			"lightness": 60
		  }
		]
	  },
	  {
		"elementType": "labels.text.stroke",
		"stylers": [
		  {
			"color": "#000000"
		  },
		  {
			"weight": 2
		  }
		]
	  },
	  {
		"featureType": "administrative.land_parcel",
		"elementType": "labels",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "administrative.neighborhood",
		"elementType": "labels",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "administrative.province",
		"elementType": "geometry.stroke",
		"stylers": [
		  {
			"color": "#000000"
		  }
		]
	  },
	  {
		"featureType": "landscape",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#000000"
		  },
		  {
			"lightness": 25
		  }
		]
	  },
	  {
		"featureType": "landscape.natural",
		"stylers": [
		  {
			"lightness": 5
		  }
		]
	  },
	  {
		"featureType": "poi",
		"elementType": "geometry",
		"stylers": [
		  {
			"saturation": -75
		  },
		  {
			"lightness": -75
		  }
		]
	  },
	  {
		"featureType": "poi",
		"elementType": "labels.icon",
		"stylers": [
		  {
			"saturation": -50
		  }
		]
	  },
	  {
		"featureType": "poi",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#757575"
		  }
		]
	  },
	  {
		"featureType": "poi.attraction",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "poi.business",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "poi.government",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "poi.medical",
		"elementType": "geometry",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "poi.park",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#9e9e9e"
		  }
		]
	  },
	  {
		"featureType": "poi.place_of_worship",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "poi.school",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#999999"
		  },
		  {
			"visibility": "simplified"
		  }
		]
	  },
	  {
		"featureType": "road",
		"elementType": "labels.icon",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "road",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#9e9e9e"
		  },
		  {
			"lightness": -15
		  }
		]
	  },
	  {
		"featureType": "road",
		"elementType": "labels.text.stroke",
		"stylers": [
		  {
			"lightness": -15
		  }
		]
	  },
	  {
		"featureType": "road.arterial",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#000000"
		  },
		  {
			"lightness": 15
		  }
		]
	  },
	  {
		"featureType": "road.arterial",
		"elementType": "labels.icon",
		"stylers": [
		  {
			"saturation": -75
		  }
		]
	  },
	  {
		"featureType": "road.highway",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#000000"
		  },
		  {
			"lightness": 15
		  }
		]
	  },
	  {
		"featureType": "road.local",
		"stylers": [
		  {
			"visibility": "simplified"
		  }
		]
	  },
	  {
		"featureType": "road.local",
		"elementType": "geometry",
		"stylers": [
		  {
			"color": "#000000"
		  },
		  {
			"lightness": 15
		  }
		]
	  },
	  {
		"featureType": "road.local",
		"elementType": "labels",
		"stylers": [
		  {
			"visibility": "on"
		  },
		  {
			"weight": 1
		  }
		]
	  },
	  {
		"featureType": "transit",
		"elementType": "geometry",
		"stylers": [
		  {
			"lightness": -70
		  }
		]
	  },
	  {
		"featureType": "transit",
		"elementType": "labels.icon",
		"stylers": [
		  {
			"saturation": -50
		  }
		]
	  },
	  {
		"featureType": "transit.line",
		"stylers": [
		  {
			"lightness": -20
		  },
		  {
			"weight": 0.5
		  }
		]
	  },
	  {
		"featureType": "transit.station.airport",
		"elementType": "labels",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "transit.station.bus",
		"stylers": [
		  {
			"visibility": "off"
		  }
		]
	  },
	  {
		"featureType": "water",
		"elementType": "geometry",
		"stylers": [
		  {
			"saturation": -70
		  },
		  {
			"lightness": -75
		  }
		]
	  },
	  {
		"featureType": "water",
		"elementType": "labels.text.fill",
		"stylers": [
		  {
			"color": "#9e9e9e"
		  }
		]
	  }
	];
    }
  }
