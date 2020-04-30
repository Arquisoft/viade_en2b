import * as auth from "solid-auth-client";
import SolidFileClient from "solid-file-client";
import { AccessControlList } from '@inrupt/solid-react-components';

const fileClient = new SolidFileClient(auth, { enableLogging: true });


export async function createContentAcl(url, nameResource) {
  let aclString = `
  @prefix : <#>.
  @prefix n0: <http://www.w3.org/ns/auth/acl#>.
  @prefix ${nameResource}: <./>.
  @prefix n1: <http://xmlns.com/foaf/0.1/>.
  @prefix c: </profile/card#>.

  :ControlReadWrite
      a n0:Authorization;
      n0:accessTo ${nameResource}:;
      n0:agent c:me;
      n0:default ${nameResource}:;
      n0:mode n0:Control, n0:Read, n0:Write.
  `
  console.log(aclString)
  try {
    await fileClient.createFile(url + '.acl', aclString, "text/turtle");
    console.log('CREATED ACL '+url);
  } catch (e) {
    //alert(e)
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

  console.log(aclString)
  try {
    await fileClient.createFile(url + '.acl', aclString, "text/turtle")
    console.log('CREATED ACL INBOX');
  } catch (e) {
    alert(e)
  }
}


