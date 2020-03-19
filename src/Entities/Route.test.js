import Route from './Route';

test('instance is created correctly', () => {
    let r = new Route('name', 'itinerary');

    expect(r).toBeDefined();
    expect(r.name).toEqual('name');
    expect(r.itirenary).toEqual('itinerary');
});