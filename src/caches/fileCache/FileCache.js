import RouteFile from "Entities/RouteFile";
import {
  uploadFiles,
  removeFileAttached,
} from "data-access/gateways/FileGateway";

import routeCache from "../routeCache/RouteCache";

export default {
  filePaths: [],
  async uploadFiles(files) {
    let route = await routeCache.getSelected();
    try {
      let found = this.filePaths.find((rf) => rf.routePath === route.url);
      if (found) {
        uploadFiles(found.routePath, files).then((paths) =>
          paths.forEach((path) => {
            try {
              found.addFilePath(path);
            } catch (err) {}
          })
        );
      } else {
        let filesMap = new RouteFile(route.url, []);
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
    console.log(routeFiles);
    this.filePaths = [...routeFiles];
  },
  async removeFile(route, path) {
    this.filePaths.forEach((rf) => {
      if (rf.routePath === route.url && rf.hasPath(path)) {
        rf.removeFilePath(path);
      }
    });
    await removeFileAttached(route, path);
  },
  getFilePathsForRoute(route) {
    console.log(route);
    let routeFile = this.filePaths.find((rf) => rf.routePath === route.url);

    return routeFile ? [...routeFile.files] : [];
  },
};
