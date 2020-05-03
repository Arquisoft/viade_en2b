import * as FileUpload from "../FileManager/FileUpload";
import * as FileLink from "../FileManager/FileLink";

export async function uploadFiles(routeName, fileList) {
  if(await FileLink.checkLinkableRoute(routeName)) {
    let filePaths = await FileUpload.uploadFiles(fileList);
    await FileLink.linkFilesToRoute(filePaths, routeName);
  }
}

export async function removeFileAttached() {}
