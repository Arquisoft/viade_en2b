import gateway from './data-access/gateways';

class RouteCache {
    constructor() {
        this.routes = [];
    }

    addRoute(route) {
        if(route && !this.routes.find(obj => route.name === obj.name)) {
            await gateway.add(route);
            this.routes.push(Object.assign({}, route));
        }
    }

    deleteRoute(route) {
        let found = this.routes.find(obj => route.name === obj.name);
        if(found) {
            // TODO
        }
    }

    getRoutes() {
        if(this.routes.length != 0) {
            return this.routes.slice();
        } else {
            this.routes = await gateway.findAll();
        }
    }

    getSelected(route) {
        let found = this.routes.find(obj => route.name === obj.name);
        if(found) {
            return found;
        }

        found = await gateway.findByName(route);
        if(found) {
            this.routes.push(found);
            this.routes.sort((r1, r2) => 
                    r1.name > r2.name ? 1 : (r1.name < r2.name ? -1 : 0));
        }
        return found; // Returns whatever is found for now.
    }
}

const instance = new RouteCache();
Object.freeze(instance);

export default instance;