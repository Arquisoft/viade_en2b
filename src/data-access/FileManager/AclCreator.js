import * as auth from "solid-auth-client";
import SolidFileClient from "solid-file-client";
import { AccessControlList } from '@inrupt/solid-react-components';
import { type } from "rdf-namespaces/dist/dc";

const fileClient = new SolidFileClient(auth, { enableLogging: true });


export async function createContentAcl(url, nameResource) {
  
  let withoutSpaces = nameResource.trim();
  let resource = withoutSpaces+ "";  

  let aclString = `
  @prefix : <#>.
  @prefix n0: <http://www.w3.org/ns/auth/acl#>.
  @prefix ${resource}: <./>.
  @prefix n1: <http://xmlns.com/foaf/0.1/>.
  @prefix c: </profile/card#>.

  :ControlReadWrite
      a n0:Authorization;
      n0:accessTo ${resource}:;
      n0:agent c:me;
      n0:default ${resource}:;
      n0:mode n0:Control, n0:Read, n0:Write.
  `
  
  try {
    await fileClient.createFile(url + '.acl', aclString, "text/turtle").then().catch((error) => {console.log('It looks like we can not create necessary folders inside your pod'+url + nameResource); return;});
    console.log('CREATED ACL '+url);
  } catch (e) {
    //alert(e)
    console.log('THE ACL COULD NOT BE ADDED ');
  }
}

export async function createContentAclInbox(url) {
  let aclString = `
  @prefix : <#>.
  @prefix n0: <http://www.w3.org/ns/auth/acl#>.
  @prefix inbox: <./>.
  @prefix n1: <http://xmlns.com/foaf/0.1/>.
  @prefix c: </profile/card#>.

  :Append
      a n0:Authorization;
      n0:accessTo inbox:;
      n0:agentClass n1:Agent;
      n0:default inbox:;
      n0:mode n0:Append.
  :ControlReadWrite
      a n0:Authorization;
      n0:accessTo inbox:;
      n0:agent c:me;
      n0:default inbox:;
      n0:mode n0:Control, n0:Read, n0:Write.
  `

 
  try {
    await fileClient.createFile(url + '.acl', aclString, "text/turtle").then().catch((error) => {console.log('It looks like we can not create necessary folders inside your pod'); return;});
    console.log('CREATED ACL INBOX');
  } catch (e) {
    alert(e)
  }
}


export async function createContentAclMedia(url, nameResource) {

  let withoutSpaces = nameResource.trim();
  let resource = withoutSpaces+ ""; 

  let aclString = `
  @prefix : <#>.
  @prefix n0: <http://www.w3.org/ns/auth/acl#>.
  @prefix n1: <http://xmlns.com/foaf/0.1/>.
  @prefix c: </profile/card#>.

  :ControlReadWrite
      a n0:Authorization;
      n0:accessTo <${resource}>;
      n0:agent c:me;
      n0:mode n0:Control, n0:Read, n0:Write.
  `
 
  try {
    await fileClient.createFile(url + '.acl', aclString, "text/turtle").then().catch((error) => {console.log('It looks like we can not create necessary folders inside your pod'+url + nameResource); return;});
    console.log('CREATED ACL '+url);
  } catch (e) {
    //alert(e)
    console.log('THE ACL COULD NOT BE ADDED ');
  }
}


export async function createContentAclComments(url, nameResource) {

  let withoutSpaces = nameResource.replace(" ", "%20");
  let resource = withoutSpaces+ ""; 

  let aclString = `
  @prefix : <#>.
  @prefix n0: <http://www.w3.org/ns/auth/acl#>.
  @prefix n1: <http://xmlns.com/foaf/0.1/>.
  @prefix c: </profile/card#>.

  :ControlReadWrite
      n0:accessTo <${resource}>;
      n0:agent c:me;
      n0:mode n0:Control, n0:Read, n0:Write.
  `
 
  try {
    await fileClient.createFile(url + '.acl', aclString, "text/turtle").then().catch((error) => {console.log('It looks like we can not create necessary folders inside your pod'+url + nameResource); return;});
    console.log('CREATED ACL COMMENTS '+url);
  } catch (e) {
    //alert(e)
    console.log('THE ACL COULD NOT BE ADDED ');
  }
}





