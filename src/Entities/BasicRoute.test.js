import BasicRoute from "./BasicRoute";
import GeoCoordinate from "./GeoCoordinate";

test("instance is created correctly", () => {
  let br = new BasicRoute("name", [0]);

  expect(br).toBeDefined();
  expect(br.name).toEqual("name");
  expect(br.geoCoordinates).toEqual([0]);
});

test("geoCoordinatesAreAddedCorrectlyWithOneCoordinate", () => {
  const geoCoordinatesList = [new GeoCoordinate(55, 60)];
  let br = new BasicRoute("name", geoCoordinatesList);

  expect(br).toBeDefined();
  expect(br.name).toEqual("name");
  expect(br.geoCoordinates).toEqual(geoCoordinatesList);
});

test("geoCoordinatesAreAddedCorrectlyWithMultipleCoordinates", () => {
  const geoCoordinatesList = [
    new GeoCoordinate(55, 60),
    new GeoCoordinate(50, 65),
    new GeoCoordinate(100, 200),
  ];
  let br = new BasicRoute("name", geoCoordinatesList);

  expect(br).toBeDefined();
  expect(br.name).toEqual("name");
  expect(br.geoCoordinates).toEqual(geoCoordinatesList);
});

test("set the url", () => {
  const geoCoordinatesList = [
    new GeoCoordinate(55, 60),
    new GeoCoordinate(50, 65),
    new GeoCoordinate(100, 200),
  ];
  let br = new BasicRoute("name", geoCoordinatesList);
  br.setUrl("path/to/route");

  expect(br).toBeDefined();
  expect(br.name).toEqual("name");
  expect(br.url).toEqual("path/to/route");
  expect(br.geoCoordinates).toEqual(geoCoordinatesList);
});

test("set the json format", () => {
  const geoCoordinatesList = [
    new GeoCoordinate(55, 60),
    new GeoCoordinate(50, 65),
    new GeoCoordinate(100, 200),
  ];
  let br = new BasicRoute("name", geoCoordinatesList);
  br.setJsonFormat("json");

  expect(br).toBeDefined();
  expect(br.name).toEqual("name");
  expect(br.getJson()).toEqual("json");
  expect(br.geoCoordinates).toEqual(geoCoordinatesList);
});
