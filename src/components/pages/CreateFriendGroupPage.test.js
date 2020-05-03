import React, { Component } from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";
import CreateFriendGroupPage from "./CreateFriendGroupPage";

Enzyme.configure({ adapter: new Adapter() });

/////////////////////////

test("CreateFriendGroupPage", () => {
  expect(CreateFriendGroupPage).toBeDefined();
});
