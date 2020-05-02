import * as CreateFriendGroup from "./CreateFriendGroup";

test("test addToNewGroup friend", () => {
  var friend = "Pepe";
  CreateFriendGroup.default.addToNewGroup(friend);

  expect(CreateFriendGroup.default.friends[0]).toBe("Pepe");
});

test("test create template friend", () => {
  var friend = "Pepe";

  expect(
    CreateFriendGroup.default.group_template("Viade", "Viaders", "12345")
  ).not.toBe("");
});

test("test uuid", () => {
  expect(CreateFriendGroup.default.create_UUID()).not.toBe("");
});
