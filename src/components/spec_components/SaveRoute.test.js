import React, { Component } from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";
import SaveRoute from "./SaveRoute";

Enzyme.configure({ adapter: new Adapter() });

/////////////////////////

test("SaveRoute", () => {
  var saver = mount(<SaveRoute />);
  expect(SaveRoute).toBeDefined();
});

test("SaveRoute", () => {
  var saver = shallow(<SaveRoute />);
  expect(SaveRoute).toBeDefined();
});

test("SaveRoute", () => {
  var saver = mount(<SaveRoute />);
  var state = saver.state.nameRoute;
  expect(state).toBe(undefined);
});
