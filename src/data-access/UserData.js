import { useLDflexValue, useLDflexList } from '@solid/react';


export function GetUserName() {
    const name = useLDflexValue('user.name') || 'unknown';
    return name.value;
}

export function GetUserFriends(){
    const friends = useLDflexList('user.friends');
    return friends;
}

export function GetUserFriendsName(){
    let friendsName = GetUserFriends();
    
    const friends = useLDflexList('user.friends.name');
    return friends;
}

export function GetNumberOfFriends(){
    const name = useLDflexValue('user.firstName') || 'unknown';
    const friends = useLDflexList('user.friends');
    return friends.length;
}