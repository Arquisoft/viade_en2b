import FriendCache from "./FriendCache";
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

beforeEach(() => {
  FriendCache.clear();
  mockGetUserFriends.mockClear();
});

test("load the friends from the user's POD", async () => {
  await FriendCache.loadFriends();

  expect(mockGetUserFriends).toHaveBeenCalled();
  expect(FriendCache.friends).toEqual(dummyFriendList);
});

test("get the friends in the cache", () => {
  FriendCache.friends = [...dummyFriendList];
  let friends = FriendCache.getFriends();

  expect(friends).toEqual(dummyFriendList);
});

test("clear the cache", () => {
  FriendCache.clear();

  expect(FriendCache.friends.length).toBe(0);
  expect(FriendCache.friends).toEqual([]);
});
