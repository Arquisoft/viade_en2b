import React from "react";

import Login from "../login/Login";
import * as cache from "caches/friendCache/FriendCache";

const LoginPage = () => {
  cache.default.loadFriends();
  return <Login></Login>;
};
export default LoginPage;
