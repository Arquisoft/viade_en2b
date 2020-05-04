import * as auth from "solid-auth-client";
import SolidFileClient from "solid-file-client";
import { handleFetchError } from "./FileUtils";

const routesFolder = "viade/routes/";

const getAttachmentDate = () => {
  return new Date().toISOString();
};

export const checkLinkableRoute = async (routeName) => {
  let session = await auth.currentSession();
  let storageRoot = session.webId.split("profile")[0];
  return routeName.includes(storageRoot);
}

export const linkFilesToRoute = async (fileUris, routeName) => {
  let fileClient = new SolidFileClient(auth, { enableLogging: true });
  let session = await auth.currentSession();
  let storageRoot = session.webId.split("profile")[0];
  let buildRouteFolderPath = storageRoot + routesFolder;
  let attachementDate = getAttachmentDate();

  if (await fileClient.itemExists(buildRouteFolderPath)) {
    let viadeRoutes = await fileClient.readFolder(storageRoot + routesFolder);
    let routeFiles = viadeRoutes.files;
    
    routeFiles.forEach(async (file) => {
      if (file.url.match(routeName)) {
        let routeFile = await fileClient.readFile(file.url);
        let route = JSON.parse(routeFile);
        if (!route.media) {
          route.media = [];
        }
        fileUris.forEach((fileUri) => {
          route.media.push({ "@id": fileUri, dateTime: attachementDate });         
        });
        fileClient
          .putFile(file.url, JSON.stringify(route), file.type)
          .catch(handleFetchError);
      }
    });
  }
};
