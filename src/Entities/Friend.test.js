import Friend from './Friend';

test('Test Friend', () => {
    let friend = new Friend('randWebId', 'Pepe','undef');

    friend.toString();
    expect(friend).toBeDefined();
    expect(friend.webId).toEqual('randWebId');
    
});