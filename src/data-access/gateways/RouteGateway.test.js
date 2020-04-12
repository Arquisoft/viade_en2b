import * as RouteGateway from "./RouteGateway";

const mockGatewayFindAll = jest.fn().mockImplementation((callback) => {
  return [];
});
const mockGatewayFindByName = jest.fn().mockImplementation((name, callback) => {
  if (!name) {
    return undefined;
  }
  return {
    name: "route1",
    points: [
      { lat: 0, long: 0 },
      { lat: 1, long: 1 },
    ],
    jsonFormat: {
      name: "route1",
    },
  };
});
jest.mock("RouteManager/ListUserRoutes", () => {
  return jest.fn().mockImplementation(() => {
    return {
      loadUserRoutesFiles: mockGatewayFindAll,
      loadRouteByName: mockGatewayFindByName,
    };
  });
});

const mockGatewayUpdate = jest
  .fn()
  .mockImplementation((cacheRoute) => {
    if (!pass) {
      return false;
    }
    return true;
  });
jest.mock("RouteManager/UpdateRoute", () => {
  return jest.fn().mockImplementation(() => {
    return {
      updatePod: mockGatewayUpdate,
    };
  });
});

var dummyRoute = {
  name: "route1",
  points: [
    { lat: 0, long: 0 },
    { lat: 1, long: 1 },
  ],
  jsonFormat: {
    name: "route1",
  },
};
var dummyNewRoute = {
  name: "route2",
  points: [
    { lat: 0, long: 0 },
    { lat: 1, long: 1 },
  ],
};
var dummyWrongRoute = {
  name: null,
  points: [
    { lat: 1, long: 1 },
    { lat: 2, long: 2 },
  ],
};
var pass = true;

beforeEach(() => {
  mockGatewayFindAll.mockClear();
  mockGatewayFindByName.mockClear();
  mockGatewayUpdate.mockClear();
})

test("find all routes", () => {
  let routes = RouteGateway.findAll(() => {});

  expect(routes).toEqual([]);
});

test("delete a route by name", () => {
  let result = RouteGateway.deleteByName("name");

  expect(result).toBeTruthy();
});

test("delete a route by url", () => {
  let result = RouteGateway.deleteByUrl("name");

  expect(result).toBeTruthy();
});

test("find a route by name", async () => {
  let result = await RouteGateway.findByName("route1", () => {});

  expect(result).toBeTruthy();
  expect(result).toEqual(dummyRoute);
});

test("update a route", async () => {
  let updated = await RouteGateway.updateByName(
    dummyRoute,
    dummyNewRoute,
    () => {}
  );

  expect(updated).toBeTruthy();
  expect(updated).toEqual({
    name: "route2",
    points: [
      { lat: 0, long: 0 },
      { lat: 1, long: 1 },
    ],
    jsonFormat: {
      name: "route2",
    },
  });
});

test("try to update a wrong route", async () => {
  let updated = await RouteGateway.updateByName(
    { name: undefined },
    dummyNewRoute,
    () => {}
  );

  expect(updated).toBeFalsy();
});

test("try to update a route with wrong data", async () => {
  pass = false;
  let updated = await RouteGateway.updateByName(
    dummyRoute,
    dummyWrongRoute,
    () => {}
  );

  expect(updated).toBeFalsy();
  pass = true;
});
