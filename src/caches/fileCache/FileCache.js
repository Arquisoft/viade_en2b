import RouteFile from 'Entities/RouteFile';
import * as FileGateway from 'data-access/gateways/FileGateway'

export default {
    filePaths: [],
    addFile(route, files) {
        let found = this.filePaths.find(rf => rf.routePath === route.name);
        console.log(found);
        try {
            if(found) {
                let paths = FileGateway.uploadFiles(found.routePath, files);
                paths.forEach(path => {
                    try {
                        found.addFilePath(path);
                    } catch(err) {}
                });
                console.log(this.filePaths);
            } else {
                let filesMap = new RouteFile(route.name, []);
                this.filePaths = [...this.filePaths, filesMap];

                let paths = FileGateway.uploadFiles(filesMap.routePath, files);
                paths.forEach(path => filesMap.addFilePath(path));
            }
        } catch(err) {
            console.log(err);
        }
    },
    removeFile(route, path) {
        this.filePaths.forEach(rf => rf.removeFilePath(path));
        FileGateway.removeFile(route, path);
    }
}