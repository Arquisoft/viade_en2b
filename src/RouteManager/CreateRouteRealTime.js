import GeoCoordinate from "../Entities/GeoCoordinate";
import BasicRoute from "../Entities/BasicRoute";
import * as CreateRoute from "./CreateRoute";

export default {
  main() {
    main();
  },

  getRoute() {
    route.getRoute();
  },
  stop() {
    stop();
  },
  setNameAndUpload(name, description) {
    route.putNameToRoute(name, description);
    route.getRoute();
  },
  getRouteIsOver() {
    return route.routeIsOver;
  },
};

class RouteCreator {
  constructor() {
    this.geoCoordinates = [];
    this.nameRoute = "";
    this.descriptionRoute = "";
    this.routeIsOver = false;
  }

  addCoords(coords) {
    if (!this.checkCoordsAlreadyExist(coords)) {
      this.geoCoordinates.push(coords);
      console.log(coords);
    }
  }
  checkCoordsAlreadyExist(coords) {
    let aux = false;
    this.geoCoordinates.map((a) => {
      if (a.lat === coords.lat && a.lng === coords.lng) {
        aux = true;
      }
      return 0;
    });
    return aux;
  }
  putNameToRoute(name, description) {
    this.nameRoute = name;
    this.descriptionRoute = description;
  }
  getRouteNotUpload() {
    let r = new BasicRoute(this.nameRoute, this.geoCoordinates, this.descriptionRoute);

    return r;
  }
  getRoute() {
    let r = new BasicRoute(this.nameRoute, this.geoCoordinates, this.descriptionRoute);
    console.log(r);
    CreateRoute.default.createNormalBasic(r);
  }

  resetRoute() {
    this.geoCoordinates = [];
    this.nameRoute = "";
    this.descriptionRoute = "";
  }
}

const route = new RouteCreator();

function stop() {
  route.routeIsOver = true;
  route.putNameToRoute("finalTest");
  console.log(route.getRouteNotUpload());
  localStorage.setItem(
    "routePreview",
    JSON.stringify(route.getRouteNotUpload())
  );
}
async function main() {
  let id;
  while (!route.routeIsOver) {
    id = navigator.geolocation.getCurrentPosition(
      (position) => {
        putCoords(position.coords.latitude, position.coords.longitude);
      },
      error,
      options
    );
    
    await sleep(2000);
  }
  //navigator.geolocation.clearWatch(id);
  
  //route.getRoute();
}

function putCoords(lat, long) {
  let latitude = lat;
  let longitude = long;
  route.addCoords(new GeoCoordinate(latitude, longitude));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

const options = {
  enableHighAccuracy: false,
  timeout: 50000000,
  maximumAge: 0,
};
