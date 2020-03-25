import RouteFile from 'Entities/RouteFile';

export default {
    filePaths = [],
    addFile(path, route) {
        let found = this.filePaths.find(rf => rf.route.name === route.name);
        if(found) {
            found.addFilePath(path);
        } else {
            let filesMap = new RouteFile();
            filesMap.addFilePath(path);
            this.filePaths = [...filePaths, filesMap];
        }
    }
}