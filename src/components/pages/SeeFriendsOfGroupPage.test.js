import React, { Component } from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";
import SeeFriendsOfGroupPage from "./SeeFriendsOfGroupPage";

Enzyme.configure({ adapter: new Adapter() });

/////////////////////////

test("SeeFriendsOfGroupPage", () => {
  expect(SeeFriendsOfGroupPage).toBeDefined();
});
