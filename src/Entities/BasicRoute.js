export default class BasicRoute{
    constructor(name, geoCoordinates) {
        this.name = name;
        this.geoCoordinates =Array.from(geoCoordinates);
    }
}