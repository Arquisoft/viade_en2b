import { useNotification, NotificationTypes } from '@inrupt/solid-react-components';
import {setPermissionsTo, checkPermissions} from 'util/PermissionManager';
//import  {findUserInboxes, getDefaultInbox} from 'NotificationsManager/NotificationManager2';
import {GetUserWebId} from 'data-access/UserData';

const request = require("request");

function Create(){
    const webIdPropioCreo = "https://clrmrnd.inrupt.net/";    
    const { createNotification } = useNotification(webIdPropioCreo);
    return createNotification;
}

export async function ShareWith(route, webIdFriend){
    
    const webIdPropioCreo = "https://clrmrnd.inrupt.net/";    
    const license = "https://creativecommons.org/licenses/by-sa/4.0/";    
    var targetUrl = webIdFriend + "viade/inbox/";

    //check if it's already shared
    const shared = await checkPermissions("READ", webIdFriend, route);
    if(shared){//!

        //set permissions to read in the route
        setPermissionsTo("READ", route, webIdFriend);

        //send notification to other user inbox
        const content = {
            title: "Notification Example",
            summary: route,
            actor: webIdFriend
        };

        const toSend = createNotificationJSONLD(webIdPropioCreo, route, webIdFriend);
        
        try{
            sendNotification(webIdPropioCreo, webIdFriend, toSend);
            console.log('SENDED');
        } catch(e){
            console.log('There was an error');
        }        
        
    }
   
}


export async function sendNotification (webId, targetWebId, content) {
    var inbox = "https://testingclrmrnd.inrupt.net/viade/inbox/";
    await request({
      method: "POST",
      uri: inbox,
      body: content,
      headers: {
        "Content-Type": "text/turtle"
      }
    },
    function (error, response, content) {
      if (error) { return false } else {
        console.log("Notificacion subida correctamente, el servidor respondio con :", content);
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


