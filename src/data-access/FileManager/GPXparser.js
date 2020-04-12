import GPX from 'gpx-parser-builder';
import GeoCoordinate from "../../Entities/GeoCoordinate";
import BasicRoute from "../../Entities/BasicRoute";
import * as CreateRoute from "../../RouteManager/CreateRoute";

export default {
    parseFile(file){
        parseGPXfileToRouteObject(file);
    }
}


    function parseToRouteObject(fileContent){
        let gpx = GPX.parse(fileContent);
        console.log("YEEEEEEEES");
        let routesList = [];

        gpx.trk.forEach(r => {
            let routeName = r.name;
            let itirenary = [];
            r.trkseg.forEach(points =>{
                points.trkpt.forEach(point =>{
                    itirenary.push(new GeoCoordinate(point.lat, point.lon))
                });
            });
            let route = new BasicRoute(routeName, itirenary);
            console.log(route);
            routesList.push(route);
        });
        CreateRoute.default.createNormalBasic(routesList[0]);
    }

    function parseGPXfileToRouteObject(file){
        console.log(file);
        let reader = new FileReader();
         reader.onload = () => {
            let routeString = reader.result;
            console.log("1");
            console.log(routeString);
            try {
                parseToRouteObject(routeString);
            } catch(error) {
                console.log(error);
            }
          }
          console.log("2");
          reader.readAsText(file);
    }