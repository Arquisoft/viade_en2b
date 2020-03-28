import * as FileUpload from '../FileManager/FileUpload';

export async function uploadFiles(route, fileList) {
    return await FileUpload.uploadFiles(fileList);
}

export function removeFile() {

}