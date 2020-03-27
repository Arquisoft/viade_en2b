export default class RouteFile {
    constructor(routePath, files) {
        this.routePath = routePath;
        this.files = [...files];
    }

    hasPath(path) {
        return this.files.includes(path);
    }

    addFilePath(path) {
        if(!this.files.includes(path)) {
            this.files = [...this.files, path];
        } else {
            throw new Error(`The path "${path}" is already in the cache.`);
        }
    }

    removeFilePath(path) {
        this.files = this.files.filter(fp => fp !== path);
    }
}