import ldflex from '@solid/query-ldflex';
import {GetUserWebId} from '../data-access/UserData';

/**
 * Method that deletes the user given its id.
 * If the user is not a friend of the user autenticated
 * it does nothing.
 * 
 * @param {} webId from the user you want to delete.
 */
export async function DeleteFriend(webId){
    console.log('User:');
    const userDeleting = await GetUserWebId();
    console.log(userDeleting);  
    console.log('Wants to delete user:');  
    console.log(webId);

    return ldflex[userDeleting].knows.delete(ldflex[webId]);    
}


