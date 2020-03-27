import Itinerary from './Itinerary';

test('instance is created correctly', () => {
    let i = new Itinerary(1, [0, 0]);

    expect(i).toBeDefined();
    expect(i.numberOfItems).toEqual(1);
    expect(i.itemList).toEqual([0, 0]);
});