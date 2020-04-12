import File from "../Entities/File";
import Route from "../Entities/BasicRoute";
import RouteFile from "../Entities/RouteFile";

export default class RoutesLoader {
  async loadUserRoutesFiles(callback) {
    const auth = require("solid-auth-client");
    const FC = require("solid-file-client");
    const fc = new FC(auth);
    let routes = [];
    let session = await auth.currentSession();
    //let popupUri = 'https://solid.community/common/popup.html';
    if (!session || session.webId === undefined || session.webId === null) {
        //session = await auth.popupLogin({popupUri});
        callback();
        return { routes: [], files: [] };
    }
    //alert('Logged in as ' + session.webId);
    let routesFolder =
      session.webId.substring(0, session.webId.length - 16) + //"/public/Routes/";
      "/viade/routes/"

    if (await fc.itemExists(routesFolder)) {
      try {
        let content = await fc.readFolder(routesFolder);

        let files = content.files;

        for (let i = 0; i < files.length; i++) {
          let fileContent = await fc.readFile(files[i].url);
          routes.push(fileContent);
        }
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

    async loadRouteByName(name,callback){
        const auth = require('solid-auth-client')
        const FC = require('solid-file-client')
        const fc = new FC(auth)

        let session = await auth.currentSession();
        let popupUri = 'https://solid.community/common/popup.html';
        if (!session || session.webId === undefined || session.webId === null){
            callback();
            return undefined;}
        //alert('Logged in as ' + session.webId);
        let routesFolder =  session.webId.substring(0, session.webId.length - 16) + "/viade/routes/";

        if (await fc.itemExists(routesFolder)) {
            //console.log(routesFolder + " exists");
            try {
                let content = await fc.readFolder(routesFolder);

                let files = content.files;

                for (let i = 0; i < files.length; i++) {
                    let fileContent = await fc.readFile(files[i].url);
                    try{ let tempRoute = JSON.parse(fileContent);
                        if(tempRoute.name===name){

                            let route =  new Route(tempRoute.name,tempRoute.itinerary);
                            route.setUrl(files[i].url);
                            route.setJsonFormat(tempRoute);
                            console.log("Match "+route.url);
                            return route;
                        }}catch(error){
                        console.log("wrong json format");
                    }

                }


            } catch (error) {
                console.log("The folder couldn't be read")
                console.log(error)         // A full error response
                console.log(error.status)  // Just the status code of the error
                console.log(error.message) // Just the status code and statusText
            }


        } else {
            console.log("user has no routes directory")
        }

        return undefined;



    }

  routesToJson(routes) {
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

    routesToJson(routes) {
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

    jsonToEntity(routes) {
        let entRoutes = [];
        let entFiles = [];
        for (let i = 0; i < routes.length; i++) {
            try {
                console.log(routes[i]);
                let name = routes[i].name;
                let it = routes[i].itinerary;
                let route = new Route(name, it);
                route.setJsonFormat(routes[i]);
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

    getMediaAttachedToRoute(route) {
        let routeFile = new RouteFile(route.name, []);
        for (let i = 0; i < route.media.length; i++) {
            let path = route.media[i]["@id"];
            let date = new Date(route.media[i]["dateTime"]);
            let file = new File(path, date);
            routeFile.addFilePath(file);
        }
        return routeFile;
    }}