import React, { Component } from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";
import SeeFriendsOfGroupPage from "./SeeFriendsOfGroupPage";

Enzyme.configure({ adapter: new Adapter() });

/////////////////////////

test("SeeFriendsOfGroupPage", () => {
  var friendsgroup = <SeeFriendsOfGroupPage />;
  expect(friendsgroup).toBeDefined();
});

test("SeeFriendsOfGroupPage state", () => {
  var friendsgroup = mount(<SeeFriendsOfGroupPage />);
  friendsgroup.setState({ loading: false });
  var e = friendsgroup.state.loading;
  expect(friendsgroup).toBeDefined();
});
