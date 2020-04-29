import * as auth from "solid-auth-client";
import SolidFileClient from "solid-file-client";

import {createContentAcl, createContentAclInbox} from "../../data-access/FileManager/AclCreator";
const fileClient = new SolidFileClient(auth, { enableLogging: true });


export default {
  main() {
    createFolders();
  }
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
  
  
  createContentAcl(viade);

  fileClient.createFolder(routes);
  createContentAcl(routes);

  fileClient.createFolder(comments);
  createContentAcl(comments);

  fileClient.createFolder(inbox);
  createContentAclInbox(inbox);

  fileClient.createFolder(shared);
  createContentAcl(shared);
  
  console.log("se ha llamado");
}

