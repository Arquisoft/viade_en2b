import * as RouteGateway from "data-access/gateways/RouteGateway";
import RouteCache from "./RouteCache";

const mockGatewayAdd = jest.spyOn(RouteGateway, "add");
const mockGatewayFindAll = jest.spyOn(RouteGateway, "findAll");
const mockGatewayFind = jest.spyOn(RouteGateway, "findByName");
const mockGatewayDelete = jest.spyOn(RouteGateway, "deleteByName");
const mockGatewayUpdate = jest.spyOn(RouteGateway, "updateByName");

mockGatewayFind.mockImplementation((route) => {
  if (route.name.trim() !== "") {
    return route;
  } else {
    return undefined;
  }
});
mockGatewayFindAll.mockImplementation(() => new Array());
mockGatewayUpdate.mockImplementation(async (route, newRouteData, callback) => {
  return newRouteData;
});

var dummyRoute1 = {
  name: "route1",
  points: [
    { lat: 0, long: 0 },
    { lat: 1, long: 1 },
  ],
};
var dummyRoute2 = {
  name: "route2",
  points: [
    { lat: 0, long: 0 },
    { lat: 1, long: 1 },
  ],
};
var dummyRoute3 = {
  name: "route3",
  points: [
    { lat: 0, long: 0 },
    { lat: 1, long: 1 },
  ],
};
var dummyRouteRepeated = {
  name: "route1",
  points: [
    { lat: 0, long: 0 },
    { lat: 2, long: 1 },
  ],
};
var dummyRouteOnlyName = {
  name: "route1",
};

beforeEach(() => {
  RouteCache.routes = []; //Clear the routes saved
  RouteCache.selected = null; //Clear any selected route
  mockGatewayAdd.mockClear();
  mockGatewayFindAll.mockClear();
  mockGatewayFind.mockClear();
  mockGatewayDelete.mockClear();
});

test("add new route", () => {
  RouteCache.addRoute(dummyRoute1);

  expect(mockGatewayAdd).toHaveBeenCalled();
});

test("add cached route", () => {
  RouteCache.addRoute(dummyRoute1);
  RouteCache.addRoute(dummyRouteRepeated);

  expect(mockGatewayAdd).toHaveBeenCalledTimes(1);
});

test("get all the routes first time", () => {
  RouteCache.getRoutes();

  expect(mockGatewayFindAll).toHaveBeenCalled();
});

test("get all the routes when having them cached", () => {
  RouteCache.addRoute(dummyRoute1);
  RouteCache.getRoutes();

  expect(mockGatewayFindAll).not.toHaveBeenCalled();
});

test("select a route in the cache", () => {
  RouteCache.addRoute(dummyRoute1);
  RouteCache.setSelected(dummyRouteOnlyName);

  expect(mockGatewayFind).not.toHaveBeenCalled();
  expect(RouteCache.routes).toContainEqual(dummyRoute1);
  expect(RouteCache.selected).toEqual(dummyRoute1);
});

test("select a route not in the cache found in the pod", () => {
  RouteCache.addRoute(dummyRoute1);
  RouteCache.setSelected(dummyRoute2);

  expect(mockGatewayFind).toHaveBeenCalled();
  expect(RouteCache.selected).toEqual(dummyRoute2);
  expect(RouteCache.routes).toContain(dummyRoute2);
  expect(RouteCache.routes).not.toEqual([dummyRoute2, dummyRoute1]);
  expect(RouteCache.routes).toEqual([dummyRoute1, dummyRoute2]);
});

test("select a route not in the cache nor in the pod", () => {
  RouteCache.addRoute(dummyRoute1);
  RouteCache.setSelected({ name: "" });

  expect(mockGatewayFind).toHaveBeenCalled();
  expect(RouteCache.selected).toBeFalsy();
});

test("get the selected route when none is selected", () => {
  let found = RouteCache.getSelected();
  expect(found).toBeFalsy();
});

test("get the non-null selected route", () => {
  RouteCache.addRoute(dummyRoute1);
  RouteCache.setSelected(dummyRoute1);
  let cachedRoute = RouteCache.getSelected();

  expect(cachedRoute).toEqual(dummyRoute1);
});

test("delete a route in the cache", () => {
  RouteCache.addRoute(dummyRoute1);
  RouteCache.addRoute(dummyRoute2);
  RouteCache.deleteRoute(dummyRoute2);

  expect(mockGatewayDelete).toHaveBeenCalled();
  expect(RouteCache.routes.length).toBe(1);
});

test("delete a route not in the cache", () => {
  RouteCache.addRoute(dummyRoute1);
  RouteCache.addRoute(dummyRoute2);
  RouteCache.deleteRoute(dummyRoute3);

  expect(mockGatewayDelete).toHaveBeenCalled();
  expect(RouteCache.routes.length).toBe(2);
});

test("select a route to see its details", () => {
  RouteCache.setSelectedDetails(dummyRoute1);

  expect(RouteCache.selectedDetails).toEqual(dummyRoute1);
});

test("get a selected route to see its details", () => {
  RouteCache.setSelectedDetails(dummyRoute1);

  expect(RouteCache.getSelectedDetails()).toEqual(dummyRoute1);
});

test("update a route", async () => {
  RouteCache.routes = [dummyRoute1];
  await RouteCache.updateRoute(dummyRoute1, dummyRoute2, () => {});

  expect(mockGatewayUpdate).toHaveBeenCalled();
  expect(RouteCache.routes).toEqual([dummyRoute2]);
});

test("clear the cache", () => {
  RouteCache.addRoute(dummyRoute1);
  RouteCache.addRoute(dummyRoute2);
  RouteCache.setSelected(dummyRoute1);
  RouteCache.clear();

  expect(RouteCache.routes.length).toBe(0);
  expect(RouteCache.selected).toBeFalsy();
  expect(RouteCache.selectedDetails).toBeFalsy();
});
