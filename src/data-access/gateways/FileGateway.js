import * as FileUpload from '../FileManager/FileUpload';

export async function uploadFiles(fileList) {
    return await FileUpload.uploadFiles(fileList);
}

export function removeFile() {

}