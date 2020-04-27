import React, { Component } from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";
import FriendGroupsPage from "./FriendGroupsPage";

Enzyme.configure({ adapter: new Adapter() });

/////////////////////////

test("FriendGroupsPage", () => {
  expect(FriendGroupsPage).toBeDefined();
});
