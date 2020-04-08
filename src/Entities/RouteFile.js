export default class RouteFile {
  constructor(routePath, files) {
    this.routePath = routePath;
    this.files = [...files];
  }

  hasPath(path) {
    return this.files.includes(path);
  }

  addFilePath(path) {
    if (!this.files.includes(path)) {
      this.files = [...this.files, path];
    }
  }

  removeFilePath(path) {
    this.files = this.files.filter((fp) => fp !== path);
  }
}
