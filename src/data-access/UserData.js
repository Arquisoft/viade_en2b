import { useLDflexValue, useLDflexList } from '@solid/react';
import data from '@solid/query-ldflex';

export function GetUserName() {
  const name = useLDflexValue('user.name') || 'unknown';
  return name.value;
}

export async function GetUserProfileImage(webId) {
  return webId.vcard_hasPhoto;    
};

export function GetUserFriends() {
  const friends = useLDflexList('user.friends');
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