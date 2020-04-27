import creator from "./CreateFriendGroup";
import loader from "./GetFriendGroup";
import cache from "caches/friendGroupCache/FriendGroupCache";
export default {
  creategroup(users, groupname) {
    creator.creategroup(users, groupname);
  },
  async load(callback) {
    return loader.getUserGroupFriends(callback);
  },
};
