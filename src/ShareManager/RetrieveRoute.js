import {loadSpecificUserRoutesFiles} from 'RouteManager/ListSpecificUserRoutes';


/**
 * Method that retrieves the urls from the file
 * sharedroutes.js and lists them.
 * 
 * @param {String} routesURL url where the user
 * has the shared routes stored
 * for example "https://testingclrmrnd.inrupt.net/viade/shared/sharedroutes.json"
 */
export async function sharedRoutesList(routesURL){
  const sharedPath = routesURL;
  const url = await retrieveSharedRoutes(sharedPath);

  let routes = [];
  
  for(let i = 0; i< url.length; i++){
    //now, retrieving the specific route from the url
    let urlRoute = url[i];
    routes.push(loadSpecificUserRoutesFiles(urlRoute));
  }
  console.log(routes);
}


/**
 * Method that retrieves the file of the shared routes
 * from the folder shared of the user autenticated
 * 
 * Example: "https://testingclrmrnd.inrupt.net/viade/shared/"
 * @param {String} sharedPath 
 */

export async function retrieveSharedRoutes(sharedPath){
  const auth = require("solid-auth-client");
  const FC = require("solid-file-client");
  const fc = new FC(auth);
  let routesJSONS = [];

  let content = await fc.readFolder();
  let files = content.files;

  for (let i = 0; i < files.length; i++) {
      let fileContent = await fc.readFile(files[i].url);
      routesJSONS.push(fileContent);
  }
  const url = jsonURLRetrieve(toJson(routesJSONS));
  return url;
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
      for (let i = 0; i < routesRetrieved.length; i++){            
        const routeURL = routesRetrieved[i]['@id'];       
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
  let jsonRoutes = [];
  for (let i = 0; i < routes.length; i++) {
    try {
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