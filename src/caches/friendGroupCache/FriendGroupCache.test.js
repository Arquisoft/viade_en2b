import FriendGroupCache from "./FriendGroupCache";
import * as UserData from "../../data-access/UserData";

const mockGetUserFriends = jest.spyOn(UserData, "GetUserFriends");
mockGetUserFriends.mockImplementation(async () => {
  return [...dummyFriendList];
});

const dummyFriendList = [
  { name: "Friend1" },
  { name: "Friend2" },
  { name: "Friend3" },
];
const handleSession = () => {
  //
};
beforeEach(() => {
  FriendGroupCache.clear();
  mockGetUserFriends.mockClear();
});

test("get the friends in the cache", () => {
  FriendGroupCache.groups = [...dummyFriendList];
  let friends = FriendGroupCache.getGroups(handleSession);
});

test("clear the cache", () => {
  FriendGroupCache.clear();

  expect(FriendGroupCache.groups.length).toBe(0);
  expect(FriendGroupCache.groups).toEqual([]);
});
