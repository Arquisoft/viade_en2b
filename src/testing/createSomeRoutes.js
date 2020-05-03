
import Route from "../entities/Route"
import GeoCoordinate from "../entities/GeoCoordinate"
import Item from "../entities/Item"
import Itirenary from "../Entities/Itinerary"
import CreateRoute from "../RouteManager/CreateRoute.js"

function createSomeRoutes() {
    const list = new GeoCoordinate[10];
    let i = 0;
    for(i = 0; i<10; i++){
        let g = new GeoCoordinate(i, i+1);
        list.add(g);
    }
    const items = new Item[10];
    for(i = 0; i<10; i++){
        let g = new Item(GeoCoordinate, i);
        items.add(g);
    }

    const itirenary = new Itirenary(10, items);
    const route = new Route("test", itirenary);

    const routecreator = new CreateRoute();
    routecreator.create(route);
}

export default createSomeRoutes;