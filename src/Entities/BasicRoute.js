export default class BasicRoute {
  constructor(name, geoCoordinates, description) {
    this.name = name;
    this.description = description;
    this.geoCoordinates = Array.from(geoCoordinates);
    this.url = "";
    this.jsonFormat = "";
  }

  setUrl(url) {
    this.url = url;
  }

  setJsonFormat(jsonFormat) {
    this.jsonFormat = jsonFormat;
  }

  getJson() {
    return this.jsonFormat;
  }
}
