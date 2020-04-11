import { useNotification, NotificationTypes } from '@inrupt/solid-react-components';
import {setPermissionsTo, checkPermissions} from 'util/PermissionManager';
//import  {findUserInboxes, getDefaultInbox} from 'NotificationsManager/NotificationManager2';
import {GetUserWebId} from 'data-access/UserData';


function Create(){
    const webIdPropioCreo = "https://clrmrnd.inrupt.net/";    
    const { createNotification } = useNotification(webIdPropioCreo);
    return createNotification;
}

export async function ShareWith(route, webIdFriend){
    
    const webIdPropioCreo = "https://clrmrnd.inrupt.net/";    
    const { createNotification } = useNotification(webIdPropioCreo);
    const license = "https://creativecommons.org/licenses/by-sa/4.0/";    
    var targetUrl = webIdFriend + "viade/inbox/";

    //check if it's already shared
    const shared = await checkPermissions("READ", webIdFriend, route);
    if(!shared){

        //set permissions to read in the route
        setPermissionsTo("READ",route, webIdFriend);

        //send notification to other user inbox
        const content = {
            title: "Notification Example",
            summary: route,
            actor: webIdFriend
        };
        
        try{
            createNotification(content, targetUrl, NotificationTypes.ANNOUNCE, license);
        } catch(e){
            console.log('There was an error');
        }        
        
        //console.log('DONE');
    }
   
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


