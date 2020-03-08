import Route from "../entities/Route"
import GeoCoordinate from "../entities/GeoCoordinate"
import {JsonLdParser} from "jsonld-streaming-parser";

function createRoute(route) {
    let myParser = new JsonLdParser();
    myParser
        .on('data', "test.jsonld")
        .on('error', console.log("error"));

    myParser.write('{');
    myParser.write('"@type": "Route",');
    myParser.write('"name": "route.name",');
    myParser.write('"itirenary": {');
    myParser.write('"@type": "Itirenary",');
    myParser.write('"numberOfitems": "route.itirenary.numberOfItems",');
    myParser.write('"itemList" : [{');
    route.itirenary.map(a=>{
        myParser.write('"@type": "Item",');
        myParser.write('"order : a.order",');
        myParser.write('"geoCoordinate: {');
        myParser.write('"@type": "GeoCoordinate",');
        myParser.write('"latitude : a.geoCoordinate.latitude",');
        myParser.write('"longitude : a.geoCoordinate.longitude"');
        myParser.write('"geoCoordinate: }');
    })

    myParser.write(']}');
}
