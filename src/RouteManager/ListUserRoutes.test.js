import RoutesLoader from "./ListUserRoutes";

test("instance is created correctly", () => {
  let rL = new RoutesLoader();

  expect(rL).toBeDefined();
});

test("pod routes to json", () => {
  let rL = new RoutesLoader();
  let podRoutes = [];
  let route1 =
    "{\n" +
    '\t"name" : "Oviedo",\n' +
    '\t"itinerary" :[\n' +
    "\t\t{\n" +
    '\t\t"@type" : "GeoCoordinates",\n' +
    '\t\t"latitude" : "45.6768",\n' +
    '\t\t"longitude" : "47.7665"\n' +
    "\t\t},\n" +
    "\t\t{\n" +
    '\t\t"@type" : "GeoCoordinates",\n' +
    '\t\t"latitude" : "45.6768",\n' +
    '\t\t"longitude" : "47.7665"\n' +
    "\t\t}\n" +
    "\t]\n" +
    "}";
  let route2 =
    "{\n" +
    '\t"name" : "Gijon",\n' +
    '\t"itinerary" : [\n' +
    "\t\t{\n" +
    '\t\t"@type" : "GeoCoordinates",\n' +
    '\t\t"latitude" : "85.6768",\n' +
    '\t\t"longitude" : "77.7665"\n' +
    "\t\t},\n" +
    "\t\t{\n" +
    '\t\t"@type" : "GeoCoordinates",\n' +
    '\t\t"latitude" : "105.6768",\n' +
    '\t\t"longitude" : "127.7665"\n' +
    "\t\t}\n" +
    "\t]\n" +
    "}";
  let route3 =
    "{\n" +
    '\t"name" : "Avilés",\n' +
    '\t"itinerary" : [\n' +
    "\t\t{\n" +
    '\t\t"@type" : "GeoCoordinates",\n' +
    '\t\t"latitude" : "85.6768",\n' +
    '\t\t"longitude" : "77.7665"\n' +
    "\t\t},\n" +
    "\t\t{\n" +
    '\t\t"@type" : "GeoCoordinates",\n' +
    '\t\t"latitude" : "105.6768",\n' +
    '\t\t"longitude" : "127.7665"\n' +
    "\t\t}\n" +
    "\t]\n" +
    "}";
  podRoutes.push(route1);
  podRoutes.push(route2);
  podRoutes.push(route3);

  let jsonRoutes = rL.routesToJson(podRoutes);
  expect(jsonRoutes).toBeDefined();
  expect(jsonRoutes.length).toEqual(3);
  expect(jsonRoutes[0].name).toEqual("Oviedo");
  expect(jsonRoutes[0].itinerary).toBeDefined();
  expect(jsonRoutes[1].name).toEqual("Gijon");
  expect(jsonRoutes[1].itinerary).toBeDefined();
  expect(jsonRoutes[2].name).toEqual("Avilés");
  expect(jsonRoutes[2].itinerary).toBeDefined();
});

test("routes json to entities", () => {
  let rL = new RoutesLoader();
  let route1 = {
    name: "Oviedo",
    itinerary: [
      {
        "@type": "GeoCoordinates",
        latitude: "45.6768",
        longitude: "47.7665",
      },
      {
        "@type": "GeoCoordinates",
        latitude: "45.6768",
        longitude: "47.7665",
      },
    ],
  };
  let route2 = {
    name: "Gijon",
    itinerary: [
      {
        "@type": "GeoCoordinates",
        latitude: "85.6768",
        longitude: "77.7665",
      },
      {
        "@type": "GeoCoordinates",
        latitude: "105.6768",
        longitude: "127.7665",
      },
    ],
  };

  let route3 = {
    name: "Avilés",
    itinerary: [
      {
        "@type": "GeoCoordinates",
        latitude: "85.6768",
        longitude: "77.7665",
      },
      {
        "@type": "GeoCoordinates",
        latitude: "105.6768",
        longitude: "127.7665",
      },
    ],
  };
  let jsonRoutes = [];
  jsonRoutes.push(route1);
  jsonRoutes.push(route2);
  jsonRoutes.push(route3);

  let entityRoutes = rL.jsonToEntity(jsonRoutes);

  expect(entityRoutes.routes.length).toEqual(3);
  expect(entityRoutes.routes[0].name).toEqual("Oviedo");
  expect(entityRoutes.routes[0].geoCoordinates).toBeDefined();
  expect(entityRoutes.routes[1].name).toEqual("Gijon");
  expect(entityRoutes.routes[1].geoCoordinates).toBeDefined();
  expect(entityRoutes.routes[2].name).toEqual("Avilés");
  expect(entityRoutes.routes[2].geoCoordinates).toBeDefined();
});

test("route files created properly", () => {
  let route = {
    name: "Oviedo",
    media: [
      {
        "@id": "image.png",
        dateTime: new Date().toISOString,
      },
      {
        "@id": "video.avi",
        dateTime: new Date().toISOString,
      },
    ],
  };
  let loader = new RoutesLoader();
  let routeFile = loader.getMediaAttachedToRoute(route);

  expect(routeFile.routePath).toEqual("Oviedo");
  expect(routeFile.files.length).toBe(2);
  expect(routeFile.files[0].filePath).toEqual("image.png");
  expect(routeFile.files[1].filePath).toEqual("video.avi");
});
