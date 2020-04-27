import React, { Component } from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";
import ImportGpxPage from "./ImportGpxPage";

Enzyme.configure({ adapter: new Adapter() });

/////////////////////////

test("ImportGpxPage", () => {
  expect(ImportGpxPage).toBeDefined();
});
