import RouteFile from 'Entities/RouteFile';
import * as FileGateway from 'data-access/gateways/FileGateway'

export default {
    filePaths: [],
    addFiles(route, files) {
        let found = this.filePaths.find(rf => rf.routePath === route.name);
        try {
            if(found) {
                FileGateway.uploadFiles(found.routePath, files)
                    .then(paths => paths.forEach(path => {
                            try {
                                found.addFilePath(path);
                            } catch(err) {}
                        }
                    ));
            } else {
                let filesMap = new RouteFile(route.name, []);
                this.filePaths = [...this.filePaths, filesMap];

                FileGateway.uploadFiles(filesMap.routePath, files)
                    .then(paths => paths.forEach(path => filesMap.addFilePath(path)));
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