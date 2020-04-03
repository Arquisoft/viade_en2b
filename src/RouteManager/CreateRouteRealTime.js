import GeoCoordinate from "../Entities/GeoCoordinate";
import BasicRoute from "../Entities/BasicRoute";
import Geolocalization from "./Geolocalization";



export default {
    geoCoordinates: [],
    routeIsOver: false,
    routeName:"",
    latitude:0,
    longitude:0,
    main(){
        main();
    },

    getRoute(){
        route.getRoute();
    }
}

class RouteCreator{
    constructor(){
        this.geoCoordinates = [];
        this.nameRoute = "";
    }

    addCoords(coords){
        console.log(coords);
        this.geoCoordinates.push(coords);
    }

    putNameToRoute(name){
        this.nameRoute = name;
    }

    getRoute(){
        return new BasicRoute(this.nameRoute, this.geoCoordinates);
    }
    
}

const route = new RouteCreator();

async function main (){
        let routeIsOver = false;
        let counterSleep = 0;
        let counterNext = 0;
        while(!routeIsOver){
            navigator.geolocation.getCurrentPosition((position) =>{
                    putCoords(position.coords.latitude, position.coords.longitude);
            });

            await sleep(20000);
            
            if(counterNext>100){
                routeIsOver = true;    
            }
            
            counterNext++;
        }
}

function putCoords(lat, long){
        let latitude = lat;
        let longitude = long;

        route.addCoords(new GeoCoordinate(latitude, longitude));
}

function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }