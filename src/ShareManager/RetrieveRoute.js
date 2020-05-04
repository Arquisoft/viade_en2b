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

  let routes = [];
  let routes_routes = [];
  let routes_files = [];
  if (url) {
    for (let i = 0; i < url.length; i++) {
      //now, retrieving the specific route from the different urls
      let urlRoute = url[i];

      let route = await loadSpecificUserRoutesFiles(urlRoute);

      routes.push(route);

      routes_routes = [...routes_routes, ...route.routes];
      routes_files = [...routes_files, ...route.files];
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
  let urlsToReturn = [];
  var urls_cache = JSON.parse(localStorage.getItem("urls"));

  let content = await fc
    .readFolder(sharedPath)
    .then()
    .catch((err) => {
      console.log("There was a problem reading " + sharedPath);
      return;
    });

  try {
    let files = content.files;

    for (let i = 0; i < files.length; i++) {
      let fileContent = await fc.readFile(files[i].url);

      routesJSONS.push(fileContent);
      const url = jsonURLRetrieve(toJson(fileContent));
      for (let i = 0; i < url.length; i++) {
        urlsToReturn.push(url[i]);
      }

    }

    //localStorage.setItem("urls", JSON.stringify(urls_cache));

    //return urlsToReturn;
    const url = jsonURLRetrieve(toJson(routesJSONS));
    return urlsToReturn;

  } catch (error) {
    console.log("It could not be read the folder " + sharedPath);
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

      routesShared.push(routes[i]);
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

//lo hace bien
function toJson(routes) {
  let jsonRoutes = [];
  // for (let i = 0; i < routes.length; i++) {
  let routeA = "";
  try {
    routeA = routes; //routes[i]
    let route = JSON.parse(routeA);
    jsonRoutes.push(route);
  } catch (e) {
    console.log(
      "Route " +
      routeA +
      " couldn't be transformed to json because the format is wrong"
    );
  }
  //}
  return jsonRoutes;
}
