import GeoCoordinate from './GeoCoordinate';

test('instance is created correctly', () => {
    let gc = new GeoCoordinate(0, 1);

    expect(gc).toBeDefined();
    expect(gc.lat).toEqual(0);
    expect(gc.lng).toEqual(1);
});