import RoutesLoader from "RouteManager/ListUserRoutes";
//import {Read} from "rdf-namespaces/dist/acl"; -->Comment to avoid unused
import DeleteUserRoute from "../../RouteManager/DeleteUserRoute";


export function findByName(name) {

    let routesLoader = new RoutesLoader();
    return routesLoader.loadRouteByName(name);
}

export function findAll() {
    let routesLoader = new RoutesLoader();
    let loadedRoutes = routesLoader.loadUserRoutesFiles();
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

export function updateByName(cacheRoute, newRouteDate) {
    // call to ldflex to find route by the name
    //var route = await RouteRDF.findByName(name);
    // if any, modify it
    //if(route && route.name) {
    //    RouteRDF.update(route);
    //}

    let foundRoute = findByName(cacheRoute.name);
}