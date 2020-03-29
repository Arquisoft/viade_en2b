import ldflex from '@solid/query-ldflex';
import {GetUserWebId} from '../data-access/UserData'
export async function DeleteFriend(webId){
    console.log('FROM');
    console.log(await GetUserWebId());  
    console.log('TO');  
    console.log(webId);
    
    return ldflex[ await GetUserWebId()].knows.delete(ldflex[webId]);
}
