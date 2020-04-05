import mime from "mime";

export default class File {
  constructor(filePath, dateAttached) {
    this.filePath = filePath;
    this.dateAttached = dateAttached;

    this.contentType = mime.getType(this.filePath);
  }
}
