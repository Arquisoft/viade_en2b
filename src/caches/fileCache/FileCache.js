import RouteFile from "Entities/RouteFile";
import {
  uploadFiles,
  removeFileAttached
} from "data-access/gateways/FileGateway";

import routeCache from "../routeCache/RouteCache";

export default {
  filePaths: [],
  async addFiles(files) {
    let route = routeCache.getSelected();
    let found = this.filePaths.find(rf => rf.routePath === route.name);
    try {
      if (found) {
        uploadFiles(found.routePath, files).then(paths =>
          paths.forEach(path => {
            try {
              found.addFilePath(path);
            } catch (err) {}
          })
        );
      } else {
        let filesMap = new RouteFile(route.name, []);
        this.filePaths = [...this.filePaths, filesMap];

        uploadFiles(filesMap.routePath, files).then(paths =>
          paths.forEach(path => filesMap.addFilePath(path))
        );
      }
    } catch (err) {
      console.log(err);
    }
  },
  async removeFile(route, path) {
    this.filePaths.forEach(rf => {
      if(rf.routePath === route.name && rf.hasPath(path)) {
        rf.removeFilePath(path);
      }
    });
    await removeFileAttached(route, path);
  },
  async getFiles(route) {}
};
