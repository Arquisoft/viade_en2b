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
    var targetUrl = webIdFriend + "viade/inbox/";

    //check if it's already shared
    const shared = await checkPermissions("READ", webIdFriend, route);
    if(!shared){

        //set permissions to read in the route
        setPermissionsTo("READ", route, webIdFriend);

        //write the url to webid/viade/routesShared/routesShared.js
        
        
    }
   
}



const auth = require('solid-auth-cli')
const FC   = require('solid-file-client')
const fc   = new FC( auth )

async function run(){
    
    if( await fc.itemExists( someUrl )) {
        
    }
}




