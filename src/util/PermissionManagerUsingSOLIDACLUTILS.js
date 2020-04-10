import { AccessControlList, AppPermission } from '@inrupt/solid-react-components';
import {GetUserWebId} from 'data-access/UserData';



const SolidAclUtils = require('solid-acl-utils');
const auth = require('solid-auth-client');
// You could also use SolidAclUtils.Permissions.READ instead of following
// This is just more convenient
const { AclApi, AclDoc, AclParser, AclRule, Permissions, Agents } = SolidAclUtils;
const { READ, WRITE, APPEND, CONTROL } = Permissions;


export async function setPermissionsTo2(permission, urlToShare, webIdFriend){

    const mode = getMode(permission);

    const fetch = auth.fetch.bind(auth);
    const utils = new AclApi(fetch, { autoSave: true });
    //const acl = await utils.loadFromFileUrl("https://clrmrnd.inrupt.net/viade/routes/Oviedo.json");
    const acl = await utils.loadFromFileUrl(urlToShare);

    //Setting permissions
    let permissions = new Permissions();
    permissions.add(mode);

    //Setting person to grant access to.
    let agents = new Agents();
    //agents.addWebId("http://pablocanalsuarez.solid.community/");
    agents.addWebId(webIdFriend);

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
            return READ;

        case("WRITE"):
            return WRITE;


        case("APPEND"):
            return APPEND;


        case("CONTROL"):
            return CONTROL;
    }
}