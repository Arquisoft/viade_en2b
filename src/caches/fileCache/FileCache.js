import RouteFile from "Entities/RouteFile";
import {
  uploadFiles,
  removeFileAttached,
} from "data-access/gateways/FileGateway";

import routeCache from "../routeCache/RouteCache";
import { toast } from "react-toastify";

export default {
  filePaths: [],
  async uploadFiles(files) {
    let route = await routeCache.getSelected();
    try {
      let found = this.filePaths.find((rf) => rf.routePath === route.url);
      console.log(found);
      if (found) {
        uploadFiles(found.routePath, files).then().catch((error) => {
          toast.error(
            "The file could not be uploaded. Try a .jpg, .png, etc...",
            {
              draggable: true,
              position: toast.POSITION.TOP_CENTER,
            }
          )
        });
        

      } else {
        let filesMap = new RouteFile(route.url, []);
        this.filePaths = [...this.filePaths, filesMap];

        uploadFiles(filesMap.routePath, files).then().catch((error) => {
          toast.error(
            "The file could not be uploaded. Try a .jpg, .png, etc...",
            {
              draggable: true,
              position: toast.POSITION.TOP_CENTER,
            }
          )
        });        
      }
    } catch (err) {
      toast.error(
        "We do not accept the format of this file. Try with a .jpg, .png, ...",
        {
          draggable: true,
          position: toast.POSITION.TOP_CENTER,
        }
      )
      
    }
  },
  addFilePaths(routeFiles) {
    routeFiles.forEach(routeFile => {
      if (!this.filePaths.find(rf => rf.routePath === routeFile.routePath)) {
        this.filePaths.push(routeFile);
      }
    })
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
    console.log(route)
    console.log(this.filePaths)
    let routeFile = this.filePaths.find((rf) => rf.routePath === route.url);
    console.log(routeFile)
    return routeFile ? [...routeFile.files] : [];
  },
};
