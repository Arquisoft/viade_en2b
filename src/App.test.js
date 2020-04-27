import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";
import App from "./App";

Enzyme.configure({ adapter: new Adapter() });
test("renders", () => {
  const app = <App />;
  expect(app).toBeDefined();
});
