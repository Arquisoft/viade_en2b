import React, { Component } from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";
import SaveRoutePage from "./SaveRoutePage";

Enzyme.configure({ adapter: new Adapter() });

/////////////////////////

test("SaveRoutePage", () => {
  expect(SaveRoutePage).toBeDefined();
});
