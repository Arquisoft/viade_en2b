import React, {Component} from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import GenericButton from "./GenericButton";

Enzyme.configure({ adapter: new Adapter() });

/////////////////////////

test("GenericButton",()=>{
    expect(GenericButton).toBeDefined();
});

/////////////////////////

test("Render Correct",()=>{
    const button = shallow(<GenericButton name="Test"/>);
    expect(button).toMatchSnapshot();
});

/////////////////////////

const buttonTest1 = <GenericButton/>;
test("Test Empty Button",()=>{
    expect(buttonTest1.props.message).toBeUndefined();
});

////////////////////////

const buttonTestWhite = <GenericButton/>;
test("Test Wrong White Button",()=>{
    expect(buttonTestWhite.props.className).not.toBe("White");
});

const buttonTestBlue = <GenericButton className="Blue"/>
test("Test Wrong Blue Button",()=>{
    expect(buttonTestBlue.props.className).toBe("Blue");
});

///////////////////////

const buttonTest2 = <GenericButton message="Microsoft Office"/>

test("Test Message Button",()=>{
    expect(buttonTest2.props.message).toBe("Microsoft Office");
});

test("Test NotMessage Button",()=>{
    expect(buttonTest2.props.message).not.toBe("Macrohard Onfire");
});

/////////////////////////

test("TestExistance of button", () => {
    const mockLogout = jest.fn();
    const button = <GenericButton onClick={mockLogout}/>
    const wrapper = shallow(button);
    
    wrapper.simulate("click");
    expect(mockLogout).toHaveBeenCalled();
});
