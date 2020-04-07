import RoutesLoader from "RouteManager/ListUserRoutes";
//import {Read} from "rdf-namespaces/dist/acl"; -->Comment to avoid unused
import DeleteUserRoute from "../../RouteManager/DeleteUserRoute";
import UpdateRoute from "../../RouteManager/UpdateRoute";


export function findByName(name,callback) {

    let routesLoader = new RoutesLoader();
    return routesLoader.loadRouteByName(name,callback);
}

export function findAll(callback) {
    let routesLoader = new RoutesLoader();
    let loadedRoutes = routesLoader.loadUserRoutesFiles(callback);
    return loadedRoutes;
}

export function read(routeFile) {
   // let routeReader = new ReadRoute();
   // let routeList  = routeReader.readRoute(routeFile);
  //  return routeList;
}

export function add(route) {
    // Note: route is in GeoJSON format, or similar
    // pass the route to RouteJSONtoRDF, receive RDF object
    //var parsedRoute = RouteJSONtoRDF.toRDF(route);
    // call to add the route in the pod accordingly
    //await RouteRDF.add(parsedRoute);
}

export function deleteByName(name) {
    let routesDeleter = new DeleteUserRoute();
    if(routesDeleter.deleteRouteByName(name)){return true;}
    return false;
}

export function deleteByUrl(url) {
    let routesDeleter = new DeleteUserRoute();
    if(routesDeleter.deleteRouteByUrl(url)){return true;}
    return false;
}

export function updateByName(cacheRoute, newRouteData) {
    let foundRoute = findByName(cacheRoute.name);
    if(foundRoute!==null && foundRoute!==undefined){

        foundRoute.name=newRouteData.name;
        foundRoute.jsonFormat.name=newRouteData.name;
        let updateRoute = new UpdateRoute();
        updateRoute.update(foundRoute);
    }
}