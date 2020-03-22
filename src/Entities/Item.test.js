import Item from './Item';

test('instance is created correctly', () => {
    let i = new Item([0, 0], 0);

    expect(i).toBeDefined();
    expect(i.geoCoordinate).toEqual([0, 0]);
    expect(i.order).toEqual(0);
});