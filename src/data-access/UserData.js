import { useLDflexValue, useLDflexList } from '@solid/react';

const { default: data } = require('@solid/query-ldflex');


/**
 * Functions for retrieving data from the user autenticated.
 */

export function GetUserName() {
  const name = useLDflexValue('user.name') || 'unknown';
  return name.value;
}

export async function GetUserProfileImage() {
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
    console.log('NAME:'+ await GetSpecificName(ruben));
    friendsNamesArray.push('NAME:'+ await GetSpecificName(ruben));
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

/**
 * Functions for retrieving data from specific users. 
 */

export async function GetSpecificName(webId) {
  const personName = await webId.name;
  try{
    return personName.value;
  } catch (TypeError ){
    return console.log("There was some problem retrieving the name of the user:"+webId);
  }
}


export async function GetSpecificProfileImage(webId) {
  const photo = await webId.vcard_hasPhoto;     
  try{
    return photo.value;
  } catch (TypeError ){
    return console.log("There was some problem retrieving the profile picture of the user:"+webId);
  } 
};

