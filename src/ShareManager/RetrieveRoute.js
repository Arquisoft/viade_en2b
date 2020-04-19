//From the user inbox, retrieve all the notifications (marked as 'read'-> más adelante)
//Add the URL to a file located in /viade/shared/globalSharedWithMe.js
import { fetchDocument } from "tripledoc";
import { ldp, schema} from "rdf-namespaces";
import { message } from "rdf-namespaces/dist/wf";
import {loadSpecificUserRoutesFiles} from 'RouteManager/ListSpecificUserRoutes';

const $rdf = require("rdflib");
const ns = require("solid-namespace")();
//const ns = require('solid-namespace')($rdf);

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




/////////////////////////////////////////////////////////////////////////////////////////////////



//GETTIN ALL NOTIFICATIONS (urls?)
export async function getNotifications(inboxPath){ 

  let notificationDocuments = [];
  notificationDocuments = await getNotificationDocuments(inboxPath);
  console.log("NOTIFIC DOCUMENTS");
  console.log(notificationDocuments);

  let not2 = processSharedRoutes(notificationDocuments);
  console.log('NOTIFICATIONS RETRIEVED');
  console.log(not2);

}


/**
 * Returns the current list of notifications.
 * Ex: "https://testingclrmrnd.inrupt.net/viade/inbox/"
 */
export async function getNotificationDocuments (inboxPath) {
    var inbox =  inboxPath;
    var containerDoc = await fetchDocument(inbox);

    //if the document exists
    if (containerDoc) {
      var subject = containerDoc.getSubject(inbox);
      var containerURLS = subject.getAllRefs(ldp.contains);
     
      var result = []
      for (var i = 0; i < containerURLS.length; i++) {
        try {
          //FETCH DE LA NOTIFICACIÓN
         // console.log('FETCH DE LA NOTIFICACIÓN');
         // console.log(containerURLS[i]);
          var doc = await fetchDocument(containerURLS[i]);

          if (doc) {    
            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');        
            result = [...result, doc];

            var subjectNotification = containerURLS[i];
            console.log(subjectNotification);

            console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');
            //var messageNotification = containerURLS[i].getSubject(subjectNotification);
            console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC');
            //if (messageNotification){
              //sconsole.log('THERE IS A NOTIFICATION');
              //const routeNotification = messageNotification.getString(ns.as("summary"));
              //console.log('MESSAGE NOTIFICATION');
              //console.log(routeNotification);
            //}
            
          }
        } catch (e) {
        }
      }
      return result
    }
    return [];    
  }

  export async function processSharedRoutes (notificationDocuments) {
    var result = [];

    if (notificationDocuments.length > 0) {
      for (let i = 0; i < notificationDocuments.length; i++) {
        var message = notificationDocuments[i].getSubject(
          "https://testingclrmrnd.inrupt.net/viade/inbox/5cbd2db0-7cb8-11ea-b984-edbaa4d4ab97.ttl"
        );
        //console.log('MESSAGE');
        //console.log(message);

        //const route = message.getString(schema.license);
        const route = message.getString(ns.as("summary"));
        
        console.log('ROUTE');
        console.log(route);
        result.push(route);
      }
    }
    return result;
  }

  