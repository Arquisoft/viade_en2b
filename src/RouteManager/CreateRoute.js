import RouteUpload from "../data-access/FileManager/RouteUpload"

export default{
    createNormalBasic(route){
        let str = getContext();
        str+="\"name\" : \""+route.name+"\",";
        str+="\"points\" : [";
        let aux = [];
        route.geoCoordinates.map(a =>{
            if(aux.includes(a)){
                console.log(a+"Already exists in the route")
            }else{
                aux.push(a);
                str+= "{\"latitude\" : " +a.lat+",";
                str+= "\"longitude\" : " +a.lng;
                str+="},"
            }
        })
        str = str.substring(0, str.length -1);
        str+= "]}";
        console.log(str);
        RouteUpload.main(route.name, str);
    }
}


function getContext(){
    return "{\"@context\": {\"@version\": 1.1,"+
            "\"comments\": { \"@container\": \"@list\", \"@id\": \"viade:comments\" },"+
            "\"description\": { \"@id\": \"schema:description\", \"@type\": \"xs:string\"},"+
            "\"media\": { \"@container\": \"@list\", \"@id\": \"viade:media\" },"+
            "\"name\": { \"@id\": \"schema:name\", \"@type\": \"xs:string\" },"+
            "\"points\": { \"@container\": \"@list\", \"@id\": \"viade:points\" },"+
            "\"latitude\": { \"@id\": \"schema:latitude\", \"@type\": \"xs:double\" },"+
            "\"longitude\": { \"@id\": \"schema:longitude\", \"@type\": \"xs:double\" },"+
            "\"rdf\": \"http://www.w3.org/1999/02/22-rdf-syntax-ns#\","+
            "\"rdfs\": \"http://www.w3.org/2000/01/rdf-schema#\","+
            "\"schema\": \"http://schema.org/\","+
            "\"viade\": \"http://arquisoft.github.io/viadeSpec/\","+
            "\"xsd\": \"http://www.w3.org/2001/XMLSchema#\""+
        "},";
}
