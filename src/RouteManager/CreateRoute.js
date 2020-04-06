import Route from "../Entities/Route"
import GeoCoordinate from "../Entities/GeoCoordinate"
import {JsonLdParser} from "jsonld-streaming-parser";
import * as fs from 'fs';
//import * as fs from 'fs';

export default{
    createNormal(route){
        let str = "{";
        str+="@type: Route,";
        str+="name : '"+route.name+"',";
        str+="itirenary: {";
        str+="@type: 'Itirenary',";
        str+="numberOfitems : '"+route.itirenary.numberOfItems+"',";
        str+="itemList : [{";
        route.itirenary.map(a =>{
            str+= "@type: 'Item',";
            str+= "order : '" +a.order +"',";
            str+= "geoCoordinate : {"
            str+= "latitude : '" +a.geoCoordinate.latitude+"',";
            str+= "longitude : '" +a.geoCoordinate.longitude+"'";
            str+="}"
        })
        str+= "}]}";

        let json = JSON.stringify(eval(str));
        let fs = require('fs');
        fs.writeFile("test.json", json,err => console.log("something went wrong"));
    },

    createNormalBasic(route){
        let str = "{";
        str+="\"name\" : \""+route.name+"\",";
        str+="\"itirenary\" : [{";
        route.geoCoordinates.map(a =>{
            str+= "\"@type\": \"GeoCoordinate\",";
            str+= "\"latitude\" : \"" +a.lat+"\",";
            str+= "\"longitude\" : '" +a.lng+"\"";
            str+="},"
        })
        str+= "]}";
        writeFile(str);
    }
}

function writeFile(json){
    const fs = require('fs')

    const content = json;

fs.writeFile('/Users/joe/test.txt', content, err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})
}

/*
class CreateRoute{
    create(route){
        let myParser = new JsonLdParser();
        myParser
            .on("data", "test.jsonld")
            .on('error', console.log("F*ck you"));

        myParser.write('{');
        myParser.write('"@type": "Route",');
        myParser.write('"name": "route.name",');
        myParser.write('"itirenary": {');
        myParser.write('"@type": "Itirenary",');
        myParser.write('"numberOfitems": "route.itirenary.numberOfItems",');
        myParser.write('"itemList" : [{');
        route.itirenary.map(a => {
            myParser.write('"@type": "Item",');
            myParser.write('"order : a.order",');
            myParser.write('"geoCoordinate: {');
            myParser.write('"@type": "GeoCoordinate",');
            myParser.write('"latitude : a.geoCoordinate.latitude",');
            myParser.write('"longitude : a.geoCoordinate.longitude"');
            myParser.write('}');
        })

        myParser.write(']}');
    }

    createNormal(route){
        let str = "{";
        str+="@type: Route,";
        str+="name : '"+route.name+"',";
        str+="itirenary: {";
        str+="@type: 'Itirenary',";
        str+="numberOfitems : '"+route.itirenary.numberOfItems+"',";
        str+="itemList : [{";
        route.itirenary.map(a =>{
            str+= "@type: 'Item',";
            str+= "order : '" +a.order +"',";
            str+= "geoCoordinate : {"
            str+= "latitude : '" +a.geoCoordinate.latitude+"',";
            str+= "longitude : '" +a.geoCoordinate.longitude+"'";
            str+="}"
        })
        str+= "}]}";

        let json = JSON.stringify(eval(str));
        let fs = require('fs');
        fs.writeFile("test.json", json,err => console.log("something went wrong"));
    }
}*/

//export default CreateRoute;
