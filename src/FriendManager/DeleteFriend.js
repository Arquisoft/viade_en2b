import ldflex from '@solid/query-ldflex';
import {GetUserWebId} from '../data-access/UserData';

export async function DeleteFriend(webId){
    console.log('User:');
    console.log(await GetUserWebId());  
    console.log('Wants to delete user:');  
    console.log(webId);


    console.log('DELETING');
    return ldflex[await GetUserWebId()].knows.delete(ldflex[webId]); 
}
