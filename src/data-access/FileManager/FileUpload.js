import JSZip from 'jszip';
import { FileItem, FolderItem, Item } from './Item';
import FileCache from 'caches/routeCache/FileCache';
import config from './../config';
import * as auth from 'solid-auth-client';
import SolidFileClient from 'solid-file-client';

const fileClient = new SolidFileClient(auth, { enableLogging: true });
const cache = new FileCache();

const handleFetchError = async (error) => {
    let detailedErrorMessage = '';
    let displayErrorMessage = '';

    console.group('handleFetchError');
    if (error instanceof Response) {
        detailedErrorMessage = await error.text();

        console.error(`url: ${error.url}`);
        console.error(`status: ${error.status}`);

        const displayMessages = {
            '401': `The ressource at ${error.url} requires you to login.`,
            '403': `You don't have permission to access the ressource at ${error.url}.
            Please make sure that you are logged in with the correct account.
            If the server runs with version 5.0.0 or higher, make sure you gave this app read/write permission`,
            '404': `The ressource at ${error.url} was not found`,
            '500': `An internal server error occured...
            ${detailedErrorMessage}`,
        };
        if (error.status in displayMessages)
            displayErrorMessage = displayMessages[error.status];
    }
    else if (error instanceof Error) {
        detailedErrorMessage = error.message;
        console.error(error.stack);
    }
    else if (typeof error === 'string') {
        detailedErrorMessage = error;
    }
    else {
        detailedErrorMessage = JSON.stringify(error);
    }
    console.error(`errorMessage: ${detailedErrorMessage}`);
    console.error(`error: ${error}`);
    console.groupEnd();

    throw new Error((displayErrorMessage) ? displayErrorMessage : detailedErrorMessage);
}

export const uploadFiles = async (path, fileList) => {
    path = fixPath(path);

    if (!fileList.length) {
        return Promise.reject('No files to upload');
    }
    const promises = Array.from(fileList).map(file => {
      const contentType = file.type || guessContentType(file.name, file)
      return updateFile(path, file.name, file, file.type)
    });
    return Promise.all(promises).catch(handleFetchError);
};

const updateFile = (path, fileName, content, contentType) => {
    path = fixPath(path);
    return fileClient.putFile(`${path}${fileName}`, content, contentType)
        .catch(handleFetchError);
};

const fixPath = (path) => {
    if (path === "")
        return path;
    return ('/' + path).replace(/\/\//g, '/');
};

const fileItem = {
    isImage(name) {
        return patterns.image.test(name);
    },
    isVideo(name) {
        return patterns.video.test(name);
    }
}

const patterns = {
    image: /\.(jpe?g|gif|bmp|png|svg|tiff?)$/i,
    video: /\.(mp4|webm|ogg)$/i
};