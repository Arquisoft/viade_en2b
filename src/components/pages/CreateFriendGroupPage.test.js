import React, { Component } from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";
import CreateFriendGroupPage from "./CreateFriendGroupPage";

Enzyme.configure({ adapter: new Adapter() });

/////////////////////////

test("CreateFriendGroupPage", () => {
  var creategroup = mount(<CreateFriendGroupPage />);
  expect(CreateFriendGroupPage).toBeDefined();
});

test("CreateFriendGroupPage state", () => {
  var creategroup = mount(<CreateFriendGroupPage />);
  expect(CreateFriendGroupPage).toBeDefined();
});
