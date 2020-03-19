
import ReadRoute from "../../RouteManager/ReadRoute"
import RoutesLoader from "../../RouteManager/ListUserRoutes"
import DeleteUserRoute from "../../RouteManager/DeleteUserRoute"
import {Read} from "rdf-namespaces/dist/acl";


export function findByName(name) {
}

export function findAll() {
    let routesLoader = new RoutesLoader();
    let loadedRoutes =   routesLoader.loadUserRoutesFiles();
    console.log("Loaded routes length: "+loadedRoutes.length);
    return loadedRoutes;
}

export function read(routeFile) {
    let routeReader = new ReadRoute();
    let routeList  = routeReader.readRoute(routeFile);
    return routeList;
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

export function updateByName(name, route) {
    // call to ldflex to find route by the name
    //var route = await RouteRDF.findByName(name);
    // if any, modify it
    //if(route && route.name) {
    //    RouteRDF.update(route);
    //}
}