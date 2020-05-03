import * as auth from "solid-auth-client";
import SolidFileClient from "solid-file-client";

const fileClient = new SolidFileClient(auth, { enableLogging: true });


export default{
    main(name, text){
        uploadRoute(name, text);
    }
}
async function uploadRoute(name, text){
  let session = await auth.currentSession();
  if (!session || session.webId === undefined || session.webId === null) {
    throw new Error("You are not logged in.");
  }
  var file = new File([text], name+".jsonld", {
  type: "application/ld+json"
  });

  let path = session.webId.split("profile")[0];
  console.log(path);
  let buildPath = `${path}viade/routes/${file.name}`;
  console.log(buildPath);
  fileClient.createFile(buildPath, file, file.type);
}