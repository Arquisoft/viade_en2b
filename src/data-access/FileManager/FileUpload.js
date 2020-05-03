import * as auth from "solid-auth-client";
import SolidFileClient from "solid-file-client";
import mime from "mime";

import { handleFetchError } from "./FileUtils";

const fileClient = new SolidFileClient(auth, { enableLogging: true });

export const uploadFiles = async (fileList) => {
  let session = await auth.currentSession();
  if (!session || session.webId === undefined || session.webId === null) {
    throw new Error("You are not logged in.");
  }

  if (!fileList.length) {
    return Promise.reject("No files to upload");
  }

  let validFiles = validContentType(fileList);
  if (!validFiles) {
    return Promise.reject("All files must be images or videos.");
  }

  let path = session.webId.split("profile")[0];
  const promises = Array.from(fileList).map((file) => {
    let buildPath = `${path}viade/resources/${file.name}`;
    return updateFile(
      buildPath,
      file,
      file.type || mime.getType(file.name)
    ).then(() => {
      return buildPath;
    });
  });
  return Promise.all(promises).catch((err) => {
    console.log("error");
    handleFetchError(err);
  });
};

const updateFile = (path, content, contentType) => {
  console.log("updateFile");
  return fileClient.putFile(path, content, contentType).catch(handleFetchError);
};

const validContentType = (fileList) => {
  let valid = true;
  fileList.forEach((file) => {
    if (!(fileItem.isImage(file.name) || fileItem.isVideo(file.name))) {
      valid = false;
    }
  });
  return valid;
};

const fileItem = {
  isImage(name) {
    return patterns.image.test(name);
  },
  isVideo(name) {
    return patterns.video.test(name);
  },
};

const patterns = {
  image: /\.(jpe?g|gif|bmp|png|svg|tiff?)$/i,
  video: /\.(mp4|webm|ogg|avi)$/i,
};
