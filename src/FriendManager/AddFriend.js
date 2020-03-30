import ldflex from '@solid/query-ldflex';
import {GetUserWebId} from '../data-access/UserData';

export async function AddFriend(webId, friends){
    console.log('User:');
    console.log(await GetUserWebId());  
    console.log('Wants to add as friend user:');  
    console.log(webId);


    console.log('ADDING');
    return ldflex[await GetUserWebId()].knows.add(ldflex[webId]); 
}
