import {setPermissionsTo, checkPermissions} from 'util/PermissionManager';
import {createNotificationSummary, postNotification, createNotificationContent} from 'NotificationManager/NotificationManager';
import { v4 as uuidv4 } from 'uuid';
import RoutesLoader from 'RouteManager/ListUserRoutes';

/**
 * Function that allows a user to share a route with a friend.
 * Provides READ permissions to the friend over the route of the user autenticated,
 * and sends a notification to the inbox of the friend, containing the url of that
 * route.
 * 
 * Example: ShareWith( "https://clrmrnd.inrupt.net/viade/routes/Rusia.json", "https://testingclrmrnd.inrupt.net/", "https://clrmrnd.inrupt.net/")
 * 
 * @param {String} route path to the route the user wants to share.
 * @param {String} webIdFriend represents the id of the friend.
 * @param {String} webIdAuthor represents the id of the user autenticated.
 */
export async function ShareWith(route, webIdFriend, webIdAuthor){

    let loader = new RoutesLoader();

    //Sharing the route with the friend (it must be the profile of the friend).
    
    const profileFriend = webIdFriend + 'profile/card#me';
    console.log('FRIEND');
    console.log(profileFriend);
   
    //check .acl created for the path;

    //check friend has an inbox;

    //check if it's already shared
    const shared = await checkPermissions("READ", profileFriend, route);
    if(!shared){
        
        //set permissions to read in the route
        setPermissionsTo("READ", route, profileFriend);

        //retrieving media of the route
        let routeFile = loader.getMediaAttachedToRoute(route);
        let media = routeFile.files;

        for(let i = 0; i< media.length; i++){
            setPermissionsTo("READ", route, profileFriend);
        }

        //send notification to other user inbox
        const summary = createNotificationSummary(webIdAuthor, route, webIdFriend, new Date());
        const uuid = uuidv4();
        console.log(summary.toString());
        const contenido = createNotificationContent("Announce", "ROUTE", webIdFriend, summary.toString(), new Date(), uuid);
       

        try{
            postNotification(webIdFriend, contenido, uuid);
            console.log("DONE");
            return true;
        } catch(e){
            console.log('There was an error');
            return false;
        }        
        
    } else {
        console.log('The route was already shared.');
        return false;
    }
   
}


