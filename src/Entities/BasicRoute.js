export default class BasicRoute{
    constructor(name, geoCoordinates) {
        this.name = name;
        this.geoCoordinates = geoCoordinates;
        this.url="";
        this.jsonFormat="";
    }

    setUrl(url){
        this.url=url;
    }

    setJsonFormat(jsonFormat){
        this.jsonFormat=jsonFormat;
    }

    getJson(){
      return this.jsonFormat;
    }
}