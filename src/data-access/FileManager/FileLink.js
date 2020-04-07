import * as auth from "solid-auth-client";
import SolidFileClient from "solid-file-client";

import { handleFetchError } from "./FileUtils";

const routesFolder = "viade/routes/";

const getAttachmentDate = () => {
  return new Date().toISOString();
};

export const linkFilesToRoute = async (fileUris, routeName) => {
  let fileClient = new SolidFileClient(auth, { enableLogging: true });
  let session = await auth.currentSession();
  let storageRoot = session.webId.split("profile")[0];
  let buildRoutePath = storageRoot + routesFolder + routeName + ".json";
  let attachementDate = getAttachmentDate();
  if (await fileClient.itemExists(buildRoutePath)) {
    // get the route
    let routeFile = await fileClient.readFile(buildRoutePath);
    let route = JSON.parse(routeFile);
    // check the media subject
    if (!route.media) {
      route.media = [];
    }
    // for each file
    // add a new ref to a media subject
    fileUris.forEach((fileUri) => {
      route.media.push({ "@id": fileUri, dateTime: attachementDate });
    });
    // save the updated route
    fileClient
      .putFile(buildRoutePath, JSON.stringify(route), "application/json")
      .catch(handleFetchError);
  }
};
