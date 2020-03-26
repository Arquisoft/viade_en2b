import * as auth from 'solid-auth-client';
import SolidFileClient from 'solid-file-client';
import mime from 'mime';

const fileClient = new SolidFileClient(auth, { enableLogging: true });

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
    let session = await auth.currentSession();
    if (!session || session.webId === undefined || session.webId === null) {
        throw new Error("You are not logged in.");
    }

    if (!fileList.length) {
        return Promise.reject('No files to upload');
    }

    path = fixPath(session.webId.split("profile")[0]);
    let validFile = validContentType(file);
    if (validFile) {
        const promises = Array.from(fileList).map(file => {
            return updateFile(path, file.name, file, mime.getExtension(file.name));
        });
        return Promise.all(promises).catch(handleFetchError);
    }
};

const updateFile = (path, fileName, content, contentType) => {
    path = fixPath(path);
    path = path.endsWith('/') ? path : `${path}/`;
    return fileClient.putFile(`${path}${fileName}`, content, contentType)
        .catch(handleFetchError);
};

const fixPath = (path) => {
    if (path === "")
        return path;
    return ('/' + path).replace(/\/\//g, '/');
};

const validContentType = (file) => {
    return isImage(file.name) || isVideo(file.name);
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