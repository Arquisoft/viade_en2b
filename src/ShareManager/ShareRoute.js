import {setPermissionsTo, checkPermissions} from 'util/PermissionManager';
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

    //check if it's already shared
    const shared = await checkPermissions("READ", webIdFriend, route);
    if(!shared){

        //set permissions to read in the route
        setPermissionsTo("READ", route, webIdFriend);

        //send notification to other user inbox
        const content = {
            title: "Route shared Notification",
            summary: route,
            actor: webIdFriend
        };

        try{
            sendNotification(webIdAuthor, webIdFriend, content);
        } catch(e){
            console.log('There was an error');
        }        
        
    } else {
        console.log('The route was already shared.');
        return false;
    }
   
}

/**
 * Method that allows to send a notification to a 
 * friend.
 * @param {} webIdFriend 
 * @param {*} content 
 */
export async function sendNotification (webIdFriend, content) {
    var inbox = webIdFriend + "viade/inbox/";
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
        console.log("Notification sended");
        return true;
      }
    })
  }


export function createNotificationJSONLD(webIdAuthor, routePath, webIdTo){
    return JSON.stringify(

        {
            "@context": "https://www.w3.org/ns/activitystreams",
            "summary": "A route was shared with you",
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


