import React, {Component} from "react";
import FixedContainer from "./FixedContainer";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

test("FixedContainer",()=>{
    expect(FixedContainer).toBeDefined();
});

/////////////////////////

test("Render Correct",()=>{
    const container = shallow(<FixedContainer/>);
    expect(container).toMatchSnapshot();
});
