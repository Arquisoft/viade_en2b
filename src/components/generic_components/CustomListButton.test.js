import React, { Component } from "react";
import CustomListButton from "./CustomListButton";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

test("CustomButtomList mount", () => {
  var buttom = mount(<CustomListButton />);
  expect(buttom).toBeDefined();
});

test("CustomButtomList shallow", () => {
  var buttom = shallow(<CustomListButton />);
  expect(buttom).toBeDefined();
});

test("CustomButtomList button", () => {
  var buttom = mount(<CustomListButton />);

  expect(buttom.find("button")).toBeDefined();
});
