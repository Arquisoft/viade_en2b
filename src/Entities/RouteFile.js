export default class RouteFile {
    constructor(routePath, filePaths) {
        this.routePath = routePath;
        this.filePaths = [...filePaths];
    }

    addFilePath(path) {
        this.filePaths = [...this.filePaths, path];
    }

    removeFilePath(path) {
        this.filePaths.filter(fp => fp === path)
    }
}