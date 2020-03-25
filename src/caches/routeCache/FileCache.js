import RouteFile from 'Entities/RouteFile';
import * as FileGateway from 'data-access/gateways/FileGateway'

export default {
    filePaths = [],
    addFile(route, path) {
        let found = this.filePaths.find(rf => rf.routePath === route.name);
        if(found) {
            found.addFilePath(path);

            FileGateway.uploadFile(found.routePath, path);
        } else {
            let filesMap = new RouteFile(route.name, path);
            filesMap.addFilePath(path);
            this.filePaths = [...filePaths, filesMap];

            FileGateway.uploadFile(filesMap.routePath);
        }
    },
    removeFile(route, path) {
        this.filePaths.forEach(rf => rf.removeFilePath(path));
        FileGateway.removeFile(route, path);
    }
}