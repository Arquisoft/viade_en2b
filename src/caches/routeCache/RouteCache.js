import * as RouteGateway from '../../data-access/gateways/RouteGateway';

export default {
    routes: [],
    selected: null,
    addRoute(route) {
        if(route && !this.routes.find(obj => route.name === obj.name)) {
            RouteGateway.add(route);
            this.routes.push(Object.assign({}, route));
        }
    }, 
    deleteRoute(route) {
        
        this.routes = this.routes.filter(obj => route.name !== obj.name);
        RouteGateway.deleteByName(route.name);
    }, 
    async getRoutes() {
        if(this.routes.length === 0) {
            this.routes = await RouteGateway.findAll()
                            .then(list => list);
            console.log(this.routes)
        }
        return this.routes;
    }, 
    setSelected(route) {
        console.table(this.routes);
        let found = this.routes.find(obj => route.name === obj.name);
        console.log(found);
        if(found) {
            this.selected = found;
            return;
        }

        found = RouteGateway.findByName(route);
        if(found) {
            this.routes.push(found);
            this.routes.sort((r1, r2) => r1.name > r2.name ? 1 : (r1.name < r2.name ? -1 : 0));
        }
        this.selected = found;
    }, 
    getSelected() {
        return this.selected;
    }
}
