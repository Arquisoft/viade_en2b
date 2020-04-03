import * as FileUpload from '../FileManager/FileUpload';
import * as FileLink from '../FileManager/FileLink';

export async function uploadFiles(routeName, fileList) {
    let filePaths = await FileUpload.uploadFiles(fileList);
    await FileLink.linkFilesToRoute(filePaths, routeName);
    return filePaths;
}

export async function removeFileAttached() {

}

export async function getFilesAttached(routeName) {

}