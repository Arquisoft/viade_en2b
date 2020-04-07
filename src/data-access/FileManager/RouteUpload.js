import * as auth from "solid-auth-client";
import SolidFileClient from "solid-file-client";
import mime from "mime";

import { handleFetchError } from "./FileUtils";

const fileClient = new SolidFileClient(auth, { enableLogging: true });

export const RouteUpload(content) = async fileList => {
  let session = await auth.currentSession();
  if (!session || session.webId === undefined || session.webId === null) {
    throw new Error("You are not logged in.");
  }

  let path = session.webId.split("profile")[0];
  const promises = Array.from(fileList).map(file => {
    let buildPath = `${path}viade/routes/${file.name}`;
    return updateFile(
      buildPath,
      file,
      file.type || mime.getType(file.name)
    ).then(() => {
      return buildPath;
    });
  });
  return Promise.all(promises).catch(handleFetchError);
};

const updateFile = (path, content, contentType) => {
  return fileClient.putFile(path, content, contentType).catch(handleFetchError);
};