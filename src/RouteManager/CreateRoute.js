import RouteUpload from "../data-access/FileManager/RouteUpload";
import * as comments from "../data-access/gateways/CommentsGateway";

export default {
  createNormalBasic(route) {
    getRouteInString(route).then((str)=>{
        console.log("Text got from promise "+str);
        RouteUpload.main(route.name,str);
    });
    //RouteUpload.main(route.name, str);
  },
  getNormalBasicJSON(route) {
    getRouteInString(route).then( (strRoute)=> {
        localStorage.setItem("routePreview",route);
    });
   // localStorage.setItem("routePreview", route);
  },
};

async function getRouteInString(route) {
  let str = getContext();
  let commentsUrl = await comments.createCommentsFile(route.name)+".jsonld";
  str += '"name" : "' + route.name + '",';
  str += '"description" : "' + route.description +'",'; 
  str += '"points" : [';
  let aux = [];
  route.geoCoordinates.map((a) => {
    if (aux.includes(a)) {
      console.log(a + "Already exists in the route");
    } else {
      aux.push(a);
      str += '{"latitude" : ' + a.lat + ",";
      str += '"longitude" : ' + a.lng;
      str += "},";
    }
  });
  str = str.substring(0, str.length - 1);
  str += '], "comments": "'+ commentsUrl+'"}';
  //str += "]}";
  console.log(str);
  return str;
}
function getContext() {
  return (
    '{"@context": {"@version": 1.1,' +
    '"comments": { "@container": "@list", "@id": "viade:comments" },' +
    '"description": { "@id": "schema:description", "@type": "xs:string"},' +
    '"media": { "@container": "@list", "@id": "viade:media" },' +
    '"name": { "@id": "schema:name", "@type": "xs:string" },' +
    '"points": { "@container": "@list", "@id": "viade:points" },' +
    '"latitude": { "@id": "schema:latitude", "@type": "xs:double" },' +
    '"longitude": { "@id": "schema:longitude", "@type": "xs:double" },' +
    '"rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",' +
    '"rdfs": "http://www.w3.org/2000/01/rdf-schema#",' +
    '"schema": "http://schema.org/",' +
    '"viade": "http://arquisoft.github.io/viadeSpec/",' +
    '"xsd": "http://www.w3.org/2001/XMLSchema#"' +
    "},"
  );
}
