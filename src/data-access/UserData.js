import {useLDflexValue, useLDflexList } from '@solid/react';
import Friend from '../Entities/Friend';

const { default: data } = require('@solid/query-ldflex');


/**
 * Functions for retrieving data from the user autenticated.
 */

export function GetUserName() {
  const name = useLDflexValue('user.name') || 'unknown';
  return name.value;
};

export async function GetUserProfileImage() {
  const photo = useLDflexValue('user.vcard_hasPhoto') || 'unknown';
  return photo.value;    
};

/**
 * Function that retrieves the user list of the user autenticated
 * @returns Promise  Friend[]: array of "Friend" entity.
 * 
 * For using this method the GetUserFriends the component List was
 * added in generic_components. An example using this List is
 * <List src={GetUserFriends()}></List>
 */
export async function GetUserFriends() {
  const friends = useLDflexList('user.friends');
  let friendsAux = [];

  //For each value (LDflexValue) in friends(LDflexValue [])
  friends.forEach(async friendLDflexValue =>{
    
    let friendWebIdLDflexValue = friendLDflexValue.value;
    const webId = data[friendWebIdLDflexValue];
    const webIdString = webId.toString();

    //Use the await to retrieve the data from the Promise object.
    const name = await GetSpecificName(webId);
    const profilePic = await GetSpecificProfileImage(webId);

    let friendAux = new Friend(webId, name, profilePic, webIdString);
   
    friendsAux.push(friendAux);
  });  

  return friendsAux;
};

export async function GetUserWebId() {
  const auth = require('solid-auth-client');
  let session = await auth.currentSession();
  return session.webId;
};

export function GetNumberOfFriends() {
  const friends = useLDflexList('user.friends');
  return friends.length;
};

/**
 * Functions for retrieving data from specific users. 
 */

export async function GetSpecificName(webId) {
  const personName = await webId.name;
  try{
    return personName.value;
  } catch (TypeError ){
  
    return webId.toString().substring(8, webId.toString().length - 1);
  }
};

export async function GetSpecificProfileImage(webId) {
  const photo = await webId.vcard_hasPhoto;     
  try{
    return photo.value;
  } catch (TypeError ){
    
    return "images/userPictureUndefined"
  } 
};

