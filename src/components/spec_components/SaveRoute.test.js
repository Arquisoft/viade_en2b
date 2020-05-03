import React, { Component } from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";
import SaveRoute from "./SaveRoute";

Enzyme.configure({ adapter: new Adapter() });

/////////////////////////

test("SaveRoute", () => {
  expect(SaveRoute).toBeDefined();
});
