import ldflex from '@solid/query-ldflex';
import {GetUserWebId} from '../data-access/UserData'
import Friend from '../Entities/Friend';

export async function DeleteFriend(webId, friends){
    console.log('User:');
    console.log(await GetUserWebId());  
    console.log('Wants to delete user:');  
    console.log(webId);


    let friendsAux = [];
    friendsAux= asyncFunc(friends);    

       
    console.log('AFTER');
    console.log('ARRAY');
    console.log(friendsAux);

    
    
    friendsAux.forEach(async friend => {
        
        const webIdFriend = friend.webId;
        console.log(webIdFriend);

        if(webIdFriend == webId){
            console.log('CAN BE DELETED');
            return ldflex[await GetUserWebId()].knows.delete(ldflex[webId]);
        }
    });

    console.log('COULD NOT BE DELETED');   
}

async function asyncFunc(friends){
    
}

