export default class RouteFile {
    constructor(routePath, filePaths) {
        this.routePath = routePath;
        this.filePaths = [...filePaths];
    }

    addFilePath(path) {
        if(!this.filePaths.includes(path)) {
            this.filePaths = [...this.filePaths, path];
        } else {
            throw new Error(`The path "${path}" is already in the cache.`);
        }
    }

    removeFilePath(path) {
        this.filePaths = this.filePaths.filter(fp => fp !== path);
    }
}