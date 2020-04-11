import GPX from 'gpx-parser-builder';
import GeoCoordinate from "../Entities/GeoCoordinate";
import BasicRoute from "../Entities/BasicRoute";

export default {
    parseToRouteObject(fileContent){
        let gpx = GPX.parse(fileContent);
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
        
        return routeList;
    }

    parseGPXfileToRouteObject(file){
        let str = XMLToString(file);
        parseToRouteObject(str);
    }
}

function XMLToString(oXML)
{
 //code for IE
 if (window.ActiveXObject) {
 var oString = oXML.xml; return oString;
 } 
 // code for Chrome, Safari, Firefox, Opera, etc.
 else {
 return (new XMLSerializer()).serializeToString(oXML);
 }
 }