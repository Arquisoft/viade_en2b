import * as RouteGateway from "./RouteGateway";

const mockGatewayFindAll = jest.fn().mockImplementation((callback) => {
  return [];
});
jest.mock("RouteManager/ListUserRoutes", () => {
  return jest.fn().mockImplementation(() => {
    return {
      loadUserRoutesFiles: mockGatewayFindAll,
    };
  });
});

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
