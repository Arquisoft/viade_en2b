import { useNotification, NotificationTypes } from '@inrupt/solid-react-components';
import {setPermissionsTo, checkPermissions} from 'util/PermissionManager';
import  {findUserInboxes, getDefaultInbox} from 'util/NotificationManager';
import {GetUserWebId} from 'data-access/UserData';


function Create(){
    const webIdPropioCreo = "https://clrmrnd.inrupt.net/";    
    const { createNotification } = useNotification(webIdPropioCreo);
    return createNotification;
}

export async function ShareWith(route, webIdFriend){
    
    console.log('IN SHAREWITH');

    
    const webIdPropioCreo = "https://clrmrnd.inrupt.net/";    
    const { createNotification } = useNotification(webIdPropioCreo);

    const license = "https://creativecommons.org/licenses/by-sa/4.0/";
    
    //var targetUrl = webIdFriend + "viade/inbox/";
    //console.log('TARGET URL');
    //console.log(targetUrl);

    //check if it's already shared
    //const shared = await checkPermissions("READ", webIdFriend, route);

    console.log('SHARED: ');
    //console.log(shared);

    //if(!shared){
        //set permissions to read in the route
       // setPermissionsTo("READ",route, webIdFriend);
        //send notification to other user inbox
        const content = {
            title: "Notification Example",
            summary: route,
            actor: webIdFriend
        };

        //Cómo sé la url a la que se tiene que enviar?

        var targetUrl = webIdFriend + "viade/inbox/";
        console.log('TARGET URL');
        console.log(targetUrl);
        const toSearch = "https://testingclrmrnd.inrupt.net/viade";
        
        

        console.log('CREATE NOTIFICATION');
        console.log(createNotification);
        console.log('CONTENT');
        console.log(content);
        console.log('TARGET');
        console.log(targetUrl);
        console.log('LICENSE');
        console.log(license);
        console.log('NOTIFICATION TYPE');
        console.log(NotificationTypes.ANNOUNCE);

        try{
            createNotification(content, targetUrl, NotificationTypes.ANNOUNCE, license);
        } catch(e){
            console.log('There was an error');
        }
        
        
        //console.log('DONE');
    //}
   
}