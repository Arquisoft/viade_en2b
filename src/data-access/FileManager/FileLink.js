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
  let buildRouteFolderPath = storageRoot + routesFolder;
  let attachementDate = getAttachmentDate();
  if (await fileClient.itemExists(buildRouteFolderPath)) {
    let routeFile = await fileClient.readFile(routeName);
    let route = JSON.parse(routeFile);
    if (!route.media) {
      route.media = [];
    }

    fileUris.forEach((fileUri) => {
      route.media.push({ "@id": fileUri, dateTime: attachementDate });
    });
    fileClient
      .putFile(routeName, JSON.stringify(route), routeFile.type)
      .catch(handleFetchError);
  }
};
