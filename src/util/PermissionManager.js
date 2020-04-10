import { AccessControlList, AppPermission } from '@inrupt/solid-react-components';
import {GetUserWebId} from 'data-access/UserData';

export async function setPermissionsTo(permission, webId, routePath){
    
    let mode = getMode(permission);
    console.log('MODE'+mode);
    let myWebId = "https://clrmrnd.inrupt.net/";
    console.log(myWebId);
    console.log('USER:'+myWebId+' IS TRYING TO GRANT READ PERMISSIONS TO '+webId+" TO THIS PATH: "+routePath);
    
    try {
        const permissions = [
          {
            agents: webId,
            modes: [mode]
          }
        ];
        const ACLFile = new AccessControlList(myWebId, routePath); 
        //console.log(ACLFile.createACL(permissions));
        console.log(ACLFile.getPermissions());
        ACLFile.assignPermissions(permissions);

    } catch (error) {
            return "There was a problem."
    }
    
    
}


export async function checkPermissions(permission, webId, filePath){
    let mode = getMode(permission);
    console.log('MODE');
    console.log(mode);

    const filePermissionsACL = new AccessControlList(webId, filePath);
    const permissions = await filePermissionsACL.getPermissions();

    console.log('PERMISSIONS');
    console.log(permissions);
    console.log('INCLUDES' + permission);
    console.log(permissions.includes(permission))

    return permissions.includes(permission);
}



export function getMode(permission){
    switch(permission){
        case("READ"):
            return AccessControlList.MODES.READ;

        case("WRITE"):
            return AccessControlList.MODES.WRITE;


        case("APPEND"):
            return AccessControlList.MODES.APPEND;


        case("CONTROL"):
            return AccessControlList.MODES.CONTROL;
    }
}