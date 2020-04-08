import RoutesLoader from "RouteManager/ListUserRoutes";
import DeleteUserRoute from "../../RouteManager/DeleteUserRoute";

export function findByName(name) {}

export function findAll(callback) {
  let routesLoader = new RoutesLoader();
  let loadedRoutes = routesLoader.loadUserRoutesFiles(callback);
  return loadedRoutes;
}

export function read(routeFile) {}

export function add(route) {}

export function deleteByName(name) {
  let routesDeleter = new DeleteUserRoute();
  if (routesDeleter.deleteRouteByName(name)) {
    return true;
  }
  return false;
}

export function deleteByUrl(url) {
  let routesDeleter = new DeleteUserRoute();
  if (routesDeleter.deleteRouteByUrl(url)) {
    return true;
  }
  return false;
}

export function updateByName(name, route) {}
