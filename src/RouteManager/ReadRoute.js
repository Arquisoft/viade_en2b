import BasicRoute from "../Entities/BasicRoute"

class ReadRoute{
    readRoute(file){
        let json =  JSON.parse(file);
        let basicRoute = new BasicRoute(json.name, json.itirenary);
    }

}