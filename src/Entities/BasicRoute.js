export default class BasicRoute{
    constructor(name, geoCoordinates) {
        this.name = name;
        this.geoCoordinates = geoCoordinates;
        this.url="";
    }

    setUrl(url){
        this.url=url;
    }
}