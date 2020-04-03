"use strict";
class Geolocalizacion {

    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosition.bind(this));
    }

    getPosition(position){
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
        this.accuracy = position.coords.accuracy;
        this.altitude = position.coords.altitude;
        this.altitudeAccuracy = position.coords.altitudeAccuracy;
        this.heading = position.coords.heading;
        this.speed = position.coords.speed;
    }

    getInfo(){
        return {
            lat : this.latitude,
            lng : this.longitude
        }
    }
}