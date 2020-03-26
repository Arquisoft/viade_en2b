import * as FileUpload from '../FileManager/FileUpload';

export function uploadFiles(fileList) {
    FileUpload.uploadFiles(fileList)
        .then(() => console.log("Files uploaded."))
        .catch(err => console.log("Error uploading files."));
}

export function removeFile() {

}