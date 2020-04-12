import File from "../Entities/File";
import Route from "../Entities/BasicRoute";
import RouteFile from "../Entities/RouteFile";

export async function loadSpecificUserRoutesFiles(urlRoute) {
    const auth = require("solid-auth-client");
    const FC = require("solid-file-client");
    const fc = new FC(auth);
    let routes = [];
    
    let routesFolder = urlRoute;

    if (await fc.itemExists(routesFolder)) {
      try {
        let fileContent = await fc.readFile(files[i].url);
        console.log(fileContent);
        routes.push(fileContent);
        
      } catch (error) {
        console.log("The folder couldn't be read");
        console.log(error); // A full error response
        console.log(error.status); // Just the status code of the error
        console.log(error.message); // Just the status code and statusText
      }
    } else {
      console.log("user has no routes directory");
    }

    let rou = this.jsonToEntity(this.routesToJson(routes));
    //localStorage.setItem('rutas', JSON.stringify(rou));

    return rou;
  }

  function routesToJson(routes) {
    let jsonRoutes = [];
    for (let i = 0; i < routes.length; i++) {
      try {
        let route = JSON.parse(routes[i]);
        jsonRoutes.push(route);
      } catch (e) {
        console.log(
          "Route " +
            i +
            " couldn't be transformed to json because the format is wrong"
        );
      }
    }
    return jsonRoutes;
  }

  function jsonToEntity(routes) {
    let entRoutes = [];
    let entFiles = [];
    for (let i = 0; i < routes.length; i++) {
      try {
        console.log(routes[i]);
        let name = routes[i].name;
        let it = routes[i].itinerary;
        let route = new Route(name, it);
        entRoutes.push(route);
        console.log("Route " + route.name + " was created succesfully");

        if (routes[i].media) {
          entFiles.push(this.getMediaAttachedToRoute(routes[i]));
        }
      } catch (e) {
        console.log(
          "Route " + i + " couldn't be parsed because the format is wrong"
        );
        console.log(e);
      }
    }

    return { routes: entRoutes, files: entFiles };
  }

  function getMediaAttachedToRoute(route) {
    let routeFile = new RouteFile(route.name, []);
    for (let i = 0; i < route.media.length; i++) {
      let path = route.media[i]["@id"];
      let date = new Date(route.media[i]["dateTime"]);
      let file = new File(path, date);
      routeFile.addFilePath(file);
    }
    return routeFile;
  }

