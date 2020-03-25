import JSZip from 'jszip';
import { FileItem, FolderItem, Item } from './Item';
import ApiCache from './ApiCache';
import config from './../config';
import * as solidAuth from 'solid-auth-client';
import SolidFileClient from 'solid-file-client';
import { guessContentType } from './contentTypes';

const fileClient = new SolidFileClient(solidAuth, { enableLogging: true });
const cache = new ApiCache();

export const uploadFiles = async (path, fileList) => {
    path = fixPath(path);
    cache.remove(path);

    if (!fileList.length) {
        return Promise.reject('No files to upload');
    }
    const promises = Array.from(fileList).map(file => {
      const contentType = file.type || guessContentType(file.name, file)
      return updateFile(path, file.name, file, file.type)
    });
    return Promise.all(promises).catch(handleFetchError);
};