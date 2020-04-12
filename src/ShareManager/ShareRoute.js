import {setPermissionsTo, checkPermissions} from 'util/PermissionManager';
import { v4 as uuidv4 } from 'uuid';
const request = require("request");

/**
 * Function that allows a user to share a route with a friend.
 * Provides READ permissions to the friend over the route of the user autenticated,
 * and sends a notification to the inbox of the friend, containing the url of that
 * route.
 * 
 * @param {String} route path to the route the user wants to share.
 * @param {String} webIdFriend represents the id of the friend.
 * @param {String} webIdAuthor represents the id of the user autenticated.
 */
export async function ShareWith(route, webIdFriend, webIdAuthor){
   
    //check .acl created for the path;

    //check friend has an inbox;

    //check if it's already shared
    const shared = await checkPermissions("READ", webIdFriend, route);
    if(!shared){

        //set permissions to read in the route
        setPermissionsTo("READ", route, webIdFriend);

        //send notification to other user inbox
        const content = {
            title: "NEW ROUTE Notification",
            summary: route,
            actor: webIdFriend
        };

        const uuid =uuidv4();
        const contenido = createNotificationContent("Announce", "ROUTE", webIdFriend, route, new Date(), uuid);
       

        try{
            sendNotification(webIdFriend, contenido, uuid);
        } catch(e){
            //console.log('There was an error');
        }        
        
    } else {
        //console.log('The route was already shared.');
        return false;
    }
   
}

/**
 * Method that allows to send a notification to a 
 * friend.
 * @param {} webIdFriend 
 * @param {*} content 
 */
export async function sendNotification ( webIdFriend, content, uuid) {
    var inbox = webIdFriend+"viade/inbox/";

    await request({
      method: "POST",
      uri: inbox,
      body: content,
      headers: {
        "Content-Type": "text/turtle"
      }
    },
    function (error, response, content) {
      if (error) { return false; } else {
        //console.log("Notification sended");
        return true;
      }
    })
  }

  export function createNotificationContent(type, title, webId, routePath, time, uuid){
    return `@prefix terms: <http://purl.org/dc/terms#>.
          @prefix as: <https://www.w3.org/ns/activitystreams#> .
          @prefix schema: <http://schema.org/> .
          @prefix solid: <http://www.w3.org/ns/solid/terms#> .
          @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
          @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
          @prefix : <${webId+`viade/inbox/`+uuid+`.ttl`}>.
          <${webId+`viade/inbox/`+uuid+`.ttl`}> a as:${type} ;
          schema:license <https://creativecommons.org/licenses/by-sa/4.0/>;
          terms:title "${title}" ;
          as:summary "${routePath}" ;
          as:actor <${webId}> ;
          solid:read "false"^^xsd:boolean ;
          as:published "${ time }"^^xsd:dateTime .`
}
export function createNotificationJSONLD(webIdAuthor, routePath, webIdTo){
    return JSON.stringify(

        {
            "@context": "https://www.w3.org/ns/activitystreams",
            "summary": "NEW ROUTE",
            "type": "RouteShared",

            "actor": {
                "type": "Person",
                "name": webIdAuthor
            },
            "object": {
                "type": "route",
                "name": routePath
            },
            "target": {
                "type": "Person",
                "name": webIdTo
            }

        }

    );

}


