import React, {Component} from "react";
import GenericText from "./GenericText";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

test("GenericText",()=>{
    expect(GenericText).toBeDefined();
});

/////////////////////////

test("Render Correct",()=>{
    const text = shallow(<GenericText name="Test"/>);
    expect(text).toMatchSnapshot();
});

/////////////////////////

test("Test Empty Text",()=>{
    const text = mount(<GenericText/>);
    expect(text.props.message).toBeUndefined();
});

/////////////////////////

test("Test Text Prop",()=>{
    const text = <GenericText message="Devil Trigger"/>;
    expect(text.props.message).toBe("Devil Trigger");
});

/////////////////////////

test("Test Text Prop NotCorrect",()=>{
    const text = <GenericText message="NoSong"/>;
    expect(text.props.message).not.toBe("Devil Trigger");
})

/////////////////////////

test("Check p element",()=>{
    const text= mount(<GenericText message="C"/>);
    expect(text.find("p").text()).toBe("C");
});

/////////////////////////

test("Check p element false",()=>{
    const text= mount(<GenericText message="C"/>);
    expect(text.find("p").text()).not.toBe("Java");
});