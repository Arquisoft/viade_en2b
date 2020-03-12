import * as RouteGateway from '../../data-access/gateways/RouteGateway';

export default class RouteCache {
    constructor() {
        this.routes = [];
    }

    addRoute(route) {
        if(route && !this.routes.find(obj => route.name === obj.name)) {
            RouteGateway.add(route);
            this.routes.push(Object.assign({}, route));
        }
    }

    deleteRoute(route) {
        this.routes = this.routes.filter(obj => route.name !== obj.name);
        RouteGateway.deleteByName(route.name);
    }

    getRoutes() {
        if(this.routes.length == 0) {
            this.routes = RouteGateway.findAll();
        }
        return this.routes.slice();
    }

    getSelected(route) {
        let found = this.routes.find(obj => route.name === obj.name);
        if(found) {
            return found;
        }

        found = RouteGateway.findByName(route);
        if(found) {
            this.routes.push(found);
            this.routes.sort((r1, r2) => 
                    r1.name > r2.name ? 1 : (r1.name < r2.name ? -1 : 0));
        }
        return found; // Returns whatever is found for now.
    }
}