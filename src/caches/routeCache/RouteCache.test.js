import * as RouteGateway from '../../data-access/gateways/RouteGateway';
import RouteCache from './RouteCache';

const mockGatewayAdd = jest.spyOn(RouteGateway, 'add');
const mockGatewayFindAll = jest.spyOn(RouteGateway, 'findAll');
const mockGatewayFind = jest.spyOn(RouteGateway, 'findByName');
const mockGatewayDelete = jest.spyOn(RouteGateway, 'deleteByName');

mockGatewayFind.mockImplementation(() => dummyRoute1);
mockGatewayFindAll.mockImplementation(() => new Array());

var dummyRoute1 = {
    name: 'route1',
    points: [
        { lat: 0, long: 0},
        { lat: 1, long: 1}
    ]
};
var dummyRoute2 = {
    name: 'route2',
    points: [
        { lat: 0, long: 0},
        { lat: 1, long: 1}
    ]
};
var dummyRoute3 = {
    name: 'route3',
    points: [
        { lat: 0, long: 0},
        { lat: 1, long: 1}
    ]
};
var dummyRouteRepeated = {
    name: 'route1',
    points: [
        { lat: 0, long: 0},
        { lat: 2, long: 1}
    ]
};
var dummyRouteOnlyName = {
    name: 'route1'
};

beforeEach(() => {
    RouteCache.routes = []; //Clear the routes saved
    mockGatewayAdd.mockClear();
    mockGatewayFindAll.mockClear();
    mockGatewayFind.mockClear();
    mockGatewayDelete.mockClear();
});

test('add new route', () => {
    RouteCache.addRoute(dummyRoute1);

    expect(mockGatewayAdd).toHaveBeenCalled();
});

test('add cached route', () => {
    RouteCache.addRoute(dummyRoute1);
    RouteCache.addRoute(dummyRouteRepeated);

    expect(mockGatewayAdd).toHaveBeenCalledTimes(1);
});

test('get all the routes first time', () => {
    RouteCache.getRoutes();

    expect(mockGatewayFindAll).toHaveBeenCalled();
});

test('get all the routes when having them cached', () => {
    RouteCache.addRoute(dummyRoute1);
    RouteCache.getRoutes();

    expect(mockGatewayFindAll).not.toHaveBeenCalled();
});

test('get a route in the cache', () => {
    RouteCache.addRoute(dummyRoute1);
    let cachedRoute = RouteCache.getSelected(dummyRouteOnlyName);

    expect(mockGatewayFind).not.toHaveBeenCalled();
    expect(cachedRoute).toEqual(dummyRoute1);
});

test('get a route not in the cache', () => {
    RouteCache.routes.push(dummyRoute2);
    let found = RouteCache.getSelected(dummyRoute1);

    expect(mockGatewayFind).toHaveBeenCalled();
    expect(RouteCache.routes).toContain(dummyRoute1);
    expect(RouteCache.routes).not.toEqual([dummyRoute2, dummyRoute1]);
    expect(RouteCache.routes).toEqual([dummyRoute1, dummyRoute2]);
    expect(found).toEqual(dummyRoute1);
});

test('delete a route in the cache', () => {
    RouteCache.addRoute(dummyRoute1);
    RouteCache.addRoute(dummyRoute2);
    RouteCache.deleteRoute(dummyRoute2);

    expect(mockGatewayDelete).toHaveBeenCalled();
    expect(RouteCache.routes.length).toBe(1);
});

test('delete a route not in the cache', () => {
    RouteCache.addRoute(dummyRoute1);
    RouteCache.addRoute(dummyRoute2);
    RouteCache.deleteRoute(dummyRoute3);

    expect(mockGatewayDelete).toHaveBeenCalled();
    expect(RouteCache.routes.length).toBe(2);
});
