import { useLDflexValue, useLDflexList } from '@solid/react';


export function GetUserName() {
    const name = useLDflexValue('user.name') || 'unknown';
    return name.value;
}

function GetUserFriends(){
    const friends = useLDflexList('user.friends');
}

function GetNumberOfFriends(){
    const name = useLDflexValue('user.firstName') || 'unknown';
    const friends = useLDflexList('user.friends');
    return friends.length;
}