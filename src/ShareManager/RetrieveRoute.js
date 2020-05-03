import { loadSpecificUserRoutesFiles } from "RouteManager/ListSpecificUserRoutes";
import * as cache from "caches/routeCache/RouteCache";
import * as filecache from "caches/fileCache/FileCache";
const auth = require("solid-auth-client");
const FC = require("solid-file-client");
const fc = new FC(auth);

/**
 * Method that retrieves all the routes from the shared files
 * and lists them.
 *
 * @param {String} routesURL url where the user
 * has the shared routes stored
 * for example "https://testingclrmrnd.inrupt.net/viade/shared/"
 */
export async function sharedRoutesList(routesURL) {
  const sharedPath = routesURL;
  const url = await retrieveSharedRoutes(sharedPath);

  console.log("ME PEGO UN TIRO");
  console.log(url);
  let routes = [];
  let routes_routes = [];
  let routes_files = [];
  if (url) {
    console.log("LENGTH OF URL : " + url);
    for (let i = 0; i < url.length; i++) {
      //now, retrieving the specific route from the different urls
      let urlRoute = url[i];

      let route = await loadSpecificUserRoutesFiles(urlRoute);
      console.log('route');

      routes.push(route);

      routes_routes.push(route.routes[0]);
      routes_files.push(route.files[0]);
    }
    console.table(routes_routes);
    filecache.default.addFilePaths(routes_files);
    cache.default.setSharedRoutes(routes_routes);
  }
  return routes;
}

/**
 * Method that retrieves the file of the shared routes
 * from the folder shared of the user autenticated
 *
 * Example: "https://testingclrmrnd.inrupt.net/viade/shared/"
 * @param {String} sharedPath
 */

export async function retrieveSharedRoutes(sharedPath) {
  let routesJSONS = [];
  var urls_cache = JSON.parse(localStorage.getItem("urls"));

  let content = await fc.readFolder(sharedPath).then().catch((err) => {
    console.log('There was a problem reading '+sharedPath);
    return ;
  });

  try {
    let files = content.files;
    console.log("LENGTH OF FILES : " + files.length);
    for (let i = 0; i < files.length; i++) {
      let fileContent = await fc.readFile(files[i].url);
      routesJSONS.push(fileContent);
      //urls_cache.push(files[i].url);
    }

    //localStorage.setItem("urls", JSON.stringify(urls_cache));
    const url = jsonURLRetrieve(toJson(routesJSONS));
    return url;

  } catch (error){
    console.log('It could not be read the folder '+sharedPath);
  }
  
}

/**
 * Method that retrieves the urls
 * of the file sharedroutes.js
 * @param {} routes
 */
function jsonURLRetrieve(routes) {
  let routesShared = [];
  let routesURL = [];

  for (let i = 0; i < routes.length; i++) {
    try {
      let routesRetrieved = routes[i].routes;
      for (let i = 0; i < routesRetrieved.length; i++) {
        const routeURL = routesRetrieved[i]["@id"];
        routesURL.push(routeURL);
      }

      routesShared.push(routes[i].routes);
      return routesURL;
    } catch (e) {
      // console.log(
      //  "Route " + i + " couldn't be parsed because the format is wrong"
      //);
      // console.log(e);
    }
  }

  //return { routes: entRoutes, files: entFiles };
}

function toJson(routes) {
  console.log("Inside toJson");
  let jsonRoutes = [];
  for (let i = 0; i < routes.length; i++) {
    try {
      console.log(routes);
      let route = JSON.parse(routes[i]);
      jsonRoutes.push(route);
    } catch (e) {
      //console.log(
      //  "Route " +
      //    i +
      //    " couldn't be transformed to json because the format is wrong"
      //);
    }
  }
  return jsonRoutes;
}
