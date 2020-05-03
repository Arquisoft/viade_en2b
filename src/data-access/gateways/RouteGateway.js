import RoutesLoader from "RouteManager/ListUserRoutes";
import DeleteUserRoute from "RouteManager/DeleteUserRoute";
import UpdateRoute from "RouteManager/UpdateRoute";

export async function findByName(name, callback) {
  let routesLoader = new RoutesLoader();
  let route = await routesLoader.loadRouteByName(name, callback);
  return route;
}

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

export async function updateByName(cacheRoute, newRouteData, callback) {
  let foundRoute = await findByName(cacheRoute.name, callback);

  if (foundRoute !== null && foundRoute !== undefined) {
    foundRoute.name = newRouteData.name;
    foundRoute.jsonFormat.name = newRouteData.name;

    let updateRoute = new UpdateRoute();
    let wasPodUpdated = await updateRoute.updatePod(foundRoute);
    if (wasPodUpdated) {
      console.log("Pod was updated correctly");
      return foundRoute;
    } else {
      console.log("Pod wasn't updated");
      return undefined;
    }
  }

  return undefined;
}
