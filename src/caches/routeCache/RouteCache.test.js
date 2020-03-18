import * as RouteGateway from '../../data-access/gateways/RouteGateway';
import RouteCache from './RouteCache';

const mockGatewayAdd = jest.spyOn(RouteGateway, 'add');
const mockGatewayFindAll = jest.spyOn(RouteGateway, 'findAll');
const mockGatewayFind = jest.spyOn(RouteGateway, 'findByName');
const mockGatewayDelete = jest.spyOn(RouteGateway, 'deleteByName');

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
    mockGatewayAdd.mockClear();
    mockGatewayFindAll.mockClear();
    mockGatewayFind.mockClear();
    mockGatewayDelete.mockClear();
});

test('add new route', () => {
    let cache = new RouteCache();
    cache.addRoute(dummyRoute1);

    expect(mockGatewayAdd).toHaveBeenCalled();
});

test('add cached route', () => {
    let cache = new RouteCache();
    cache.addRoute(dummyRoute1);
    cache.addRoute(dummyRouteRepeated);

    expect(mockGatewayAdd).toHaveBeenCalledTimes(1);
});

test('get all the routes first time', () => {
    let cache = new RouteCache();
    cache.getRoutes();

    expect(mockGatewayFindAll).toHaveBeenCalled();
});

test('get all the routes when having them cached', () => {
    let cache = new RouteCache();
    cache.addRoute(dummyRoute1);
    cache.getRoutes();

    expect(mockGatewayFindAll).not.toHaveBeenCalled();
});

test('get a route in the cache', () => {
    let cache = new RouteCache();
    cache.addRoute(dummyRoute1);
    let cachedRoute = cache.getSelected(dummyRouteOnlyName);

    expect(mockGatewayFind).not.toHaveBeenCalled();
    expect(cachedRoute).toEqual(dummyRoute1);
});

test('get a route not in the cache', () => {
    let cache = new RouteCache();
    cache.getSelected(dummyRoute1);

    expect(mockGatewayFind).toHaveBeenCalled();
});

test('delete a route in the cache', () => {
    let cache = new RouteCache();
    cache.addRoute(dummyRoute1);
    cache.addRoute(dummyRoute2);
    cache.deleteRoute(dummyRoute2);

    expect(mockGatewayDelete).toHaveBeenCalled();
    expect(cache.routes.length).toBe(1);
});

test('delete a route not in the cache', () => {
    let cache = new RouteCache();
    cache.addRoute(dummyRoute1);
    cache.addRoute(dummyRoute2);
    cache.deleteRoute(dummyRoute3);

    expect(mockGatewayDelete).toHaveBeenCalled();
    expect(cache.routes.length).toBe(2);
});
