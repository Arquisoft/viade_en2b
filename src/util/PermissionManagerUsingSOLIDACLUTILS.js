import { AccessControlList, AppPermission } from '@inrupt/solid-react-components';
import {GetUserWebId} from 'data-access/UserData';



const SolidAclUtils = require('solid-acl-utils');
const auth = require('solid-auth-client');
// You could also use SolidAclUtils.Permissions.READ instead of following
// This is just more convenient
const { AclApi, AclDoc, AclParser, AclRule, Permissions, Agents } = SolidAclUtils;
const { READ, WRITE, APPEND, CONTROL } = Permissions;


export async function setPermissionsTo2(){
    const fetch = auth.fetch.bind(auth);
    const utils = new AclApi(fetch, { autoSave: true });
    const acl = await utils.loadFromFileUrl("https://clrmrnd.inrupt.net/viade/routes/Oviedo.json");

    let permissions = new Permissions();
    permissions.add(READ);

    let agents = new Agents();
    agents.addWebId("http://pablocanalsuarez.solid.community/profile/card#me");

    await acl.addRule(permissions, agents);
    console.log("Done!"); 

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