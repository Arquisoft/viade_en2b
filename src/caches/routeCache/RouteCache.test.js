import * as RouteGateway from '../../data-access/gateways/RouteGateway';
import RouteCache from './RouteCache';

const mockGatewayAdd = jest.fn();
const mockGatewayFindAll = jest.fn();
const mockGatewayFind = jest.fn();
const mockGatewayDelete = jest.fn();
jest.mock('../../data-access/gateways/RouteGateway', () => {
  return jest.fn().mockImplementation(() => {
    return {
        add: mockGatewayAdd,
        findAll: mockGatewayFindAll,
        find: mockGatewayFind,
        delete: mockGatewayDelete
    };
  });
});

beforeEach(() => {
    RouteGateway.mockClear();
    mockGatewayAdd.mockClear();
    mockGatewayFindAll.mockClear();
    mockGatewayFind.mockClear();
    mockGatewayDelete.mockClear();
});

test('add new route', () => {
    let dummyRoute = {
        name: 'route1',
        points: [
            { lat: 0, long: 0},
            { lat: 1, long: 1}
        ]
    };
    let cache = new RouteCache();
    cache.addRoute(dummyRoute);

    expect(mockGatewayAdd).toHaveBeenCalled();
});
