import { useLDflexValue, useLDflexList } from '@solid/react';
import data from '@solid/query-ldflex';

export function GetUserName() {
    const name = useLDflexValue('user.name') || 'unknown';
    return name.value;
}

export async function GetUserProfileImage() {
    try {
      // fetching user card from pod. This makes a request and returns the data
     
      const { user } = data;
      /*
       * In the background LDFlex is using JSON-LD. Because of this, we need to
       * make an async call. This will return a JSON-LD expanded object and expose the requested value(name).
       * for more information please go to: https://github.com/digitalbazaar/jsonld.js
       */
      const userImage = data.user.vcard_hasPhoto;
      const { image: defaultimage } = this.state;
      const image = userImage ? userImage.value : defaultimage;
      this.setState({ image });
    } catch (error) {
      alert(error.message);
    }
  };


export function GetUserFriends(){
    const friends = useLDflexList('user.friends');
    return friends;
}

export async function GetUserWebId(){
    const auth = require('solid-auth-client');
    let session = await auth.currentSession();
    return session.webId;
}

export function GetNumberOfFriends(){
    const name = useLDflexValue('user.firstName') || 'unknown';
    const friends = useLDflexList('user.friends');
    return friends.length;
}