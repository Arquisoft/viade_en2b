import BasicRoute from './BasicRoute';

test('instance is created correctly', () => {
    let br = new BasicRoute('name', 0);

    expect(br).toBeDefined();
    expect(br.name).toEqual('name');
    expect(br.geoCoordinates).toEqual(0);
});