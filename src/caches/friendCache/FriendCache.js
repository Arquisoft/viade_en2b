import {GetUserFriends, GetNumberOfFriends} from '../../data-access/UserData';

export default {
    friends: [],
    async loadFriends(){
        if(this.friends.length === 0) {
            this.friends = await GetUserFriends()
                            .then(list => list);
            console.log("CACHE: ", this.friends)
        }
    },
    getFriends(){
        return this.friends;
    },
    clear(){
        this.friends = [];
    }
}
