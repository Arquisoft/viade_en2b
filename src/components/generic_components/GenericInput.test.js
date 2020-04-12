import React, {Component} from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import GenericInput from "./GenericInput";

Enzyme.configure({ adapter: new Adapter() });

/////////////////////////

test("GenericInput",()=>{
    expect(GenericInput).toBeDefined();
});

/////////////////////////

test("Render Correct",()=>{
    const button = shallow(<GenericInput name="Test"/>);
    expect(button).toMatchSnapshot();
});

/////////////////////////

const buttonTest1 = <GenericInput/>;
test("Test Empty Button",()=>{
    expect(buttonTest1.props.message).toBeUndefined();
});

////////////////////////

const buttonTestWhite = <GenericInput/>;
test("Test Wrong White Button",()=>{
    expect(buttonTestWhite.props.className).not.toBe("White");
});

const buttonTestBlue = <GenericInput className="Blue"/>
test("Test Wrong Blue Button",()=>{
    expect(buttonTestBlue.props.className).toBe("Blue");
});

///////////////////////

const buttonTest2 = <GenericInput message="Microsoft Office"/>

test("Test Message Button",()=>{
    expect(buttonTest2.props.message).toBe("Microsoft Office");
});

test("Test NotMessage Button",()=>{
    expect(buttonTest2.props.message).not.toBe("Macrohard Onfire");
});


