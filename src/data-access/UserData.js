import { useLDflexValue, useLDflexList } from '@solid/react';

const { default: data } = require('@solid/query-ldflex');



export function GetUserName() {
  const name = useLDflexValue('user.name') || 'unknown';
  return name.value;
}

export async function GetSepcificName(webId) {
  const personName = await webId.name;
  try{
    const toReturn = personName.value;
    return toReturn;
  } catch (TypeError ){
    return console.log("There was some kind of problem");
  }
}


export async function GetUserProfileImage(webId) {
  const photo = useLDflexValue('user.vcard_hasPhoto') || 'unknown';
  return photo.value;    
};

export async function GetUserFriends() {
  const friends = useLDflexList('user.friends');
  
  let friendsArray = [];
  let friendsNamesArray = [];
  
  console.log('HEY');
  
  console.log(friends.length);
  for(let i =0; i<i.length; i++){

  }
  friends.forEach(async friendLDflexValue =>{
    
    let friendWebId = friendLDflexValue.value;
    friendsArray.push(friendWebId);

    const ruben = data[friendWebId];
    console.log('FRIEND:'+ruben);
    console.log('NAME:'+ await GetSepcificName(ruben));
    friendsNamesArray.push('NAME:'+ await GetSepcificName(ruben));
  });
  

  return friendsNamesArray;
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

