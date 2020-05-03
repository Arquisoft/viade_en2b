import * as FriendGroupManager from "./FriendGroupManager";

test("test create group", () => {
  var friends = "Pepe";
  var groupname = "Los Pepes";

  FriendGroupManager.default.creategroup(friends, groupname);
});
