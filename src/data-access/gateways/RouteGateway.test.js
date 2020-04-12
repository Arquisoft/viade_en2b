import * as RouteGateway from "./RouteGateway";

const mockGatewayFindAll = jest.fn().mockImplementation((callback) => {
  return [];
});
const mockGatewayFindByName = jest.fn().mockImplementation((name, callback) => {
  return dummyRoute;
});
jest.mock("RouteManager/ListUserRoutes", () => {
  return jest.fn().mockImplementation(() => {
    return {
      loadUserRoutesFiles: mockGatewayFindAll,
      loadRouteByName: mockGatewayFindByName,
    };
  });
});

var dummyRoute = {
  name: "route1",
  points: [
    { lat: 0, long: 0 },
    { lat: 1, long: 1 },
  ],
};

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
