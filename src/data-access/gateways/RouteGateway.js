import { fetchDocument } from "tripledoc";

class RouteGateway {
    constructor(webId) {
        this.webId = webId; // Base address of POD
    }

    async findByName(name) {
        // call to ldflex to find :Route with subject #name
        const profileDoc = await fetchDocument(webId);
        const profile = profileDoc.getSubject(webId);
        return profile.getAllStrings(/* https://{routesURI} + */name);
    }

    async findAll() {
        // call to ldflex to find every :Route
    }

    async add(route) {
        // Note: route is in GeoJSON format, or similar
        // pass the route to RouteJSONtoRDF, receive RDF object
        // call to ldflex to add the route in the pod accordingly
    }

    async deleteByName(name) {
        // call to ldflex to find the route by the name
        // if any, call again to delete it
    }

    async updateByName(name, route) {
        // call to ldflex to find route by the name
        // if any, modify it
    }
}