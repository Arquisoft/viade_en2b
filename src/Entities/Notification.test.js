import Notification from "./Notification";

test("instance is created correctly", () => {
  let n = new Notification("urlN", "route", "urlR", "me", "webId", 12);

  expect(n).toBeDefined();
  expect(n.urlNotification).toEqual("urlN");
  expect(n.typeNotification).toEqual("route");
  expect(n.urlResource).toEqual("urlR");
  expect(n.authorName).toEqual("me");
  expect(n.authorWebId).toEqual("webId");
  expect(n.date).toEqual(12);
});
