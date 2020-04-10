import * as RouteGateway from "../../data-access/gateways/RouteGateway";
import FileCache from "../fileCache/FileCache";
import BasicRoute from "../../Entities/BasicRoute";

export default {
  routes: [],
  selected: "",
  selectedDetails: "",
  addRoute(route) {
    if (route && !this.routes.find((obj) => route.name === obj.name)) {
      RouteGateway.add(route);
      this.routes.push(Object.assign({}, route));
    }
  },
  deleteRoute(route) {
    this.routes = this.routes.filter((obj) => route.name !== obj.name);
    RouteGateway.deleteByName(route.name);
  },
 async updateRoute(route,newRouteData,callback){
    let updatedRoute = await RouteGateway.updateByName(route,newRouteData,callback);
    if(updatedRoute!==null && updatedRoute!==undefined){
    let routeIndex = this.routes.indexOf((obj) => route.name === obj.name);
    this.routes[routeIndex]=updatedRoute;}
  },
  async getRoutes(callback) {
    if (this.routes.length === 0) {
      let foundRoutes = await RouteGateway.findAll(callback);
      console.log(foundRoutes)
      if (foundRoutes.routes !== undefined) {
        this.routes = foundRoutes.routes;
        FileCache.addFilePaths(foundRoutes.files);
      } else {
        this.routes = [];
      }
    }
    return this.routes;
  },
  setSelected(route) {
    let found = this.routes.find((obj) => route.name === obj.name);

    if (found) {
      this.selected = found;
      return;
    }

    found = RouteGateway.findByName(route);
    if (found) {
      this.routes.push(found);
      this.routes.sort((r1, r2) =>
        r1.name > r2.name ? 1 : r1.name < r2.name ? -1 : 0
      );
    }
    this.selected = found;
  },
  getSelected() {
    return this.selected;
  },
  clear() {
    this.routes = [];
    this.selected = "";
    this.selectedDetails = "";
  },
  setSelectedDetails(route) {
    this.selectedDetails = route;
  },
  getSelectedDetails() {
    return this.selectedDetails;
  },
};
