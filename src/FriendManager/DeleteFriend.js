import ldflex from '@solid/query-ldflex';
import {GetUserWebId} from '../data-access/UserData';

/**
 * Method that deletes the user given its id.
 * If the user is not a friend of the user autenticated
 * it does nothing.
 * 
 * @param {} webId from the user you want to delete.
 */
export async function DeleteFriend(webId, friends){
    console.log('User:');
    const userDeleting = await GetUserWebId();
    console.log(userDeleting);  
    console.log('Wants to delete user:');  
    console.log(webId);

    
    let friendsAux = [];
    friendsAux = asyncFunc(friends);

    console.log(friends);

    
    friendsAux.then(value => Array.from(value).forEach(async friend => {
        console.log('IN');
        const webIdFriend = friend.webId;
        console.log('WEBID');
        console.log(webIdFriend);

        if(webIdFriend == webId){
            console.log('CAN BE DELETED');
            return ldflex[userDeleting].knows.delete(ldflex[webId]);
        }
    }));      
    
    console.log('COULD NOT BE DELETED');   
}

async function asyncFunc(friendsAux){
    return new Promise(resolve => {
        resolve(friendsAux);
    });
}

