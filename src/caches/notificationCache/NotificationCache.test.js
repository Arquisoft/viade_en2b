import * as NotificationCache from "./NotificationCache";

test("notification cache ", async () => {
  var cache = await NotificationCache.default.getNotifications(() => {});
  expect(cache).toStrictEqual([]);
});

test("set notifications cache ", async () => {
  NotificationCache.default.setNotifications(["Pepe"]);
  var cache = await NotificationCache.default.getNotifications(() => {});
  expect(cache).toStrictEqual(["Pepe"]);
});

test("clear cache ", async () => {
  NotificationCache.default.clear();
  var cache = await NotificationCache.default.getNotifications(() => {});
  expect(cache).toStrictEqual([]);
});
