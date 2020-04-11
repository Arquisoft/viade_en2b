import React, {Component} from "react";
import InfiniteScrollComment from "./InfiniteScrollComment";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

test("Definition",()=>{
    expect(InfiniteScrollComment).toBeDefined();
});

/////////////////////////

test("Render Correct",()=>{
    const scroll = shallow(<InfiniteScrollComment content={["hola"]}/>);
    expect(scroll).toMatchSnapshot();
});

/////////////////////////

test("Test Empty Prop",()=>{
    const scroll = mount(<InfiniteScrollComment content={["hola"]}/>);
    expect(scroll.props.message).toBeUndefined();
});

/////////////////////////

test("Test State",()=>{
    const scroll = mount(<InfiniteScrollComment content={["hola"]}/>);
    scroll.setState({hasMore: false});
    expect(scroll.state().hasMore).toBe(false);
});

/////////////////////////

test("Test Seen all",()=>{
    const scroll = mount(<InfiniteScrollComment content={["hola"]}/>);
    const element = scroll.find("InfiniteScroll");
    expect(element.exists).toBeTruthy();
});

