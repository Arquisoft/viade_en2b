import { GetUserFriends } from "../../data-access/UserData";
import friendmanager from "FriendGroupManager/FriendGroupManager";
export default {
  groups: [],
  groupSelected: "",
  setGroups(groups_param) {
    this.groups = groups_param;
  },
  async getGroups(handleSession) {
    if (this.groups.length > 0) return this.groups;
    else {
      await friendmanager.load(handleSession);
      return this.groups;
    }
  },
  clear() {
    this.groups = [];
  },
  setGroupSelected(group) {
    this.groupSelected = group;
  },
  async getGroupSelected(handleSession) {
    return this.groupSelected;
  },
};
