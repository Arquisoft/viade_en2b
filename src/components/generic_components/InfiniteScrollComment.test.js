import React, { Component } from "react";
import InfiniteScrollComment from "./InfiniteScrollComment";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

test("Definition", () => {
  expect(InfiniteScrollComment).toBeDefined();
});

/////////////////////////
