import ldflex from '@solid/query-ldflex';
import {GetUserWebId} from '../data-access/UserData';

/**
 * Method that adds the user given to the user autenticated
 * friends.
 * If the user provided is already a friend of the user autenticated
 * it does nothing.
 * 
 * @param {*} webId of the user to add.
 */
export async function AddFriend(webId){
    console.log('User:');
    const userToAdd = await GetUserWebId();
    console.log(userToAdd);  
    console.log('Wants to add as friend user:');  
    console.log(webId);


    console.log('ADDING');
    return ldflex[userToAdd].knows.add(ldflex[webId]); 
}
