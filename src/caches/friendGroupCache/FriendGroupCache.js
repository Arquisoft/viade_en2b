import { GetUserFriends } from "../../data-access/UserData";
import friendmanager from "FriendGroupManager/FriendGroupManager";
export default {
  groups: [],
  setGroups(groups_param) {
    this.groups = groups_param;
  },
  async getGroups(handleSession) {
    await friendmanager.load(handleSession);
    return this.groups;
  },
  clear() {
    this.groups = [];
  },
};
