
import GeoCoordinate from "../../Entities/GeoCoordinate";
import BasicRoute from "../../Entities/BasicRoute";
import * as CreateRoute from "../../RouteManager/CreateRoute";
import { parseGpx} from "viade-gpx-parse";

export default {
    parseFile(file){
        read(file);
    }
}


    function parseToJsonldAndUpload(route){
        try{
            CreateRoute.default.createNormalBasic(route);
            return true;
        }catch(error){
            return false;
        }
        
    }


    function read(file){
        file.forEach((file) => {
          let reader = new FileReader()

          reader.onload = () => {
            let routeString = reader.result;
            try {
              let imported = true;
              parseGpxToRoute(routeString, function(routes) {
                  routes.forEach(route => {
                    imported = parseToJsonldAndUpload(route) && imported;
                  });
                  if(imported && routes.length > 0) {
                    console.log("success");
                  } else {
                    console.log("no success");
                  }
                });
            } catch(error) {
              console.log("error: " +error );
            }
          };
          reader.readAsText(file);
        });
    }
    
    function parseGpxToRoute(string, callback){

        parseGpx(string, function (error, gpxData){
            let routes = [];
            let tracks = gpxData.tracks;

            tracks.forEach(track => {
                let route = parseRoute(track);
                routes.push(route);
            });

            return callback(routes);
            
        })
    }

    function parseRoute(track){
        let points = getPoints(track);
        let route = new BasicRoute(track.name, points);
        return route;
    }

    function getPoints(track){
        let points = [];
        track.segments.forEach( (segment) => {
            segment.forEach(trackPoint => {
                points.push(new GeoCoordinate(trackPoint.lat, trackPoint.lon));
            });
        });
        return points;
    }
