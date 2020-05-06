import * as auth from "solid-auth-client";
import SolidFileClient from "solid-file-client";

import {createContentAcl, createContentAclInbox} from "../../data-access/FileManager/AclCreator";
const fileClient = new SolidFileClient(auth, { enableLogging: true });


export default {
  async main() {
    createFolders();
  },
};

async function createFolderCheck(){

  //if 

}

async function createFolders() {
  let session = await auth.currentSession();
  if (!session || session.webId === undefined || session.webId === null) {
    throw new Error("You are not logged in.");
  }

  let path = session.webId.split("profile")[0];
  let viade = `${path}viade/routes/`;
  let routes = `${path}viade/routes/`;  
  let comments = `${path}viade/comments/`;  
  let inbox = `${path}viade/inbox/`;  
  let shared = `${path}viade/shared/`;

  let groups = `${path}viade/groups/`;
  let resources = `${path}viade/resources/`;
  
  
  createContentAcl(viade, "viade");

  fileClient.createFolder(routes).then().catch((error)=>{console.log('It looks like we can not create necessary folders inside your pod'); return;});  
  createContentAcl(routes, "routes");

  fileClient.createFolder(groups).then().catch((error)=>{console.log('It looks like we can not create necessary folders inside your pod'); return;});
  createContentAcl(groups, "groups");

  fileClient.createFolder(comments).then().catch((error)=>{console.log('It looks like we can not create necessary folders inside your pod'); return;});
  createContentAcl(comments, "comments");

  fileClient.createFolder(inbox).then().catch((error)=>{console.log('It looks like we can not create necessary folders inside your pod'); return;});
  createContentAclInbox(inbox);

  fileClient.createFolder(shared).then().catch((error)=>{console.log('It looks like we can not create necessary folders inside your pod'); return;});
  createContentAcl(shared, "shared");

  fileClient.createFolder(resources).then().catch((error)=>{console.log('It looks like we can not create necessary folders inside your pod'); return;});
  createContentAcl(resources, "resources");
  
  console.log("se ha llamado");
}


