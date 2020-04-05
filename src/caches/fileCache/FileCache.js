import RouteFile from "Entities/RouteFile";
import {
  uploadFiles,
  removeFileAttached,
} from "data-access/gateways/FileGateway";

import routeCache from "../routeCache/RouteCache";

export default {
  filePaths: [],
  async uploadFiles(files) {
    let route = routeCache.getSelected();
    try {
      let found = this.filePaths.find((rf) => rf.routePath === route.name);
      if (found) {
        uploadFiles(found.routePath, files).then((paths) =>
          paths.forEach((path) => {
            try {
              found.addFilePath(path);
            } catch (err) {}
          })
        );
      } else {
        let filesMap = new RouteFile(route.name, []);
        this.filePaths = [...this.filePaths, filesMap];

        uploadFiles(filesMap.routePath, files).then((paths) =>
          paths.forEach((path) => filesMap.addFilePath(path))
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  },
  addFilePaths(routeFiles) {
    this.filePaths = [...routeFiles];
  },
  async removeFile(route, path) {
    this.filePaths.forEach((rf) => {
      if (rf.routePath === route.name && rf.hasPath(path)) {
        rf.removeFilePath(path);
      }
    });
    await removeFileAttached(route, path);
  },
  getFilePathsForRoute(route) {
    let routeFile = this.filePaths.find((rf) => rf.routePath === route.name);
    return routeFile ? [...routeFile.files] : [];
  },
};
