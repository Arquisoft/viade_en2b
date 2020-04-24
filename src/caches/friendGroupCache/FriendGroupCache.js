import { GetUserFriends } from "../../data-access/UserData";
import friendmanager from "FriendGroupManager/FriendGroupManager";
export default {
  groups: [],
  groupSelected: "",
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
  setGroupSelected(group) {
    this.groupSelected = group;
    console.log(this.groupSelected);
  },
  async getGroupSelected(handleSession) {
    return this.groupSelected;
  },
};
