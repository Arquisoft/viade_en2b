import { fetchDocument } from "tripledoc";

interface Route {
    name: string
}

class RouteGateway {
    async findByName(name: string) {
        // call to ldflex to find :Route with subject #name
        // return the route, parsed as route object
    }

    async findAll() {
        // call to ldflex to find every :Route
    }

    async add(route: Route) {
        // Note: route is in GeoJSON format, or similar
        // pass the route to RouteJSONtoRDF, receive RDF object
        // call to ldflex to add the route in the pod accordingly
    }

    async deleteByName(name: string) {
        // call to ldflex to find the route by the name
        // if any, call again to delete it
    }

    async updateByName(name: string, route: string) {
        // call to ldflex to find route by the name
        // if any, modify it
    }
}