import { useLDflexValue, useLDflexList } from '@solid/react';
import data from '@solid/query-ldflex';

export function GetUserName() {
  const name = useLDflexValue('user.name') || 'unknown';
  return name.value;
}

export async function GetUserProfileImage() {
  
    
};


export function GetUserFriends() {
  const friends = useLDflexList('user.friends');
  return friends;
}

export async function GetUserFriendsData() {

  let friends = [];
  const userFriends = GetUserFriends();

  for await (const friend of userFriends) {

    const friendWebId = await friend.value;
    const friend_data = data[friendWebId];
    const nameLd = await friend_data.name;

    const name = nameLd && nameLd.value.trim().length > 0 ? nameLd.value : friendWebId.toString();
    const imageLd = await friend_data.vcard_hasPhoto;

    let image;
    if (imageLd && imageLd.value) {
      image = imageLd.value;
    } else {
      image = "";
    }

    var friend_obj = {
      "webId": friendWebId,
      "name": name,
      "image": image
    };
    friends.push(friend_obj);
  }

  return friends;
}

export async function GetUserWebId() {
  const auth = require('solid-auth-client');
  let session = await auth.currentSession();
  return session.webId;
}

export function GetNumberOfFriends() {
  const name = useLDflexValue('user.firstName') || 'unknown';
  const friends = useLDflexList('user.friends');
  return friends.length;
}