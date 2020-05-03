import File from "../Entities/File";
import BasicRoute from "../Entities/BasicRoute";
import RouteFile from "../Entities/RouteFile";

const auth = require("solid-auth-client");
const FC = require("solid-file-client");
const fc = new FC(auth);

export async function loadSpecificUserRoutesFiles(urlRoute) {

  let routes = [];

  let routesFolder = urlRoute;

  if (await fc.itemExists(urlRoute).then().catch((error) => { console.log('You have not being granted the permissions to read this route') })) {
    try {
      let fileContent = await fc.readFile(urlRoute);
      console.table(fileContent);
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

  let rou = jsonToEntity(routesToJson(routes));

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
      let name = routes[i].name;
      let it = routes[i].points;
      let description = routes[i].description;
      let route = new BasicRoute(name, it, description);
      route.setJsonFormat(routes[i]);
      entRoutes.push(route);
      console.log("Route " + route.name + " was created succesfully");

      if (routes[i].media) {
        entFiles.push(getMediaAttachedToRoute(routes[i]));
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


export function getMediaAttachedToRoute(route, url) {
  console.log('Inside media attached to route');


  let routeFile = new RouteFile(url, []);
  let media = route.media;
  console.log(media);

  if (media != null) {
    for (let i = 0; i < route.media.length; i++) {
      let path = route.media[i]["@id"];

      if(fc.itemExists(path).then().catch((error) => console.log('You have no permissions to read the media files'))){
        let date = new Date(route.media[i]["dateTime"]);
        let file = new File(path, date);
        routeFile.addFilePath(file);
      }      
    }
  }

  return routeFile;
}

