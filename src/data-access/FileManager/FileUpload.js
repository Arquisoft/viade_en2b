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

export const uploadFiles = async (fileList) => {
    let session = await auth.currentSession();
    if (!session || session.webId === undefined || session.webId === null) {
        throw new Error("You are not logged in.");
    }

    if (!fileList.length) {
        return Promise.reject('No files to upload');
    }

    let validFiles = validContentType(fileList);
    if(!validFiles) {
        return Promise.reject('All files must be images or videos.');
    }

    let path = fixPath(session.webId.split("profile")[0]);
    const promises = Array.from(fileList).map(file => {
        let buildPath = `${path}viade/resources/${file.name}`;
        return updateFile(buildPath, file, file.type||mime.getExtension(file.name))
            .then(() => {
                return buildPath;
            });
    });
    return Promise.all(promises).catch(handleFetchError);
};

const updateFile = (path, content, contentType) => {
    path = fixPath(path);
    return fileClient.putFile(path, content, contentType)
        .catch(handleFetchError);
};

const fixPath = (path) => {
    if (path === "")
        return path;
    return path.replace(/\/\//g, '/');
};

const validContentType = (fileList) => {
    let valid = true;
    fileList.forEach(file => {
        if(!(fileItem.isImage(file.name) || fileItem.isVideo(file.name))) {
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
    }
}

const patterns = {
    image: /\.(jpe?g|gif|bmp|png|svg|tiff?)$/i,
    video: /\.(mp4|webm|ogg)$/i
};