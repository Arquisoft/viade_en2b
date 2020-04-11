import React, {Component} from "react";
import InfiniteScrollVideo from "./InfiniteScrollVideo";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

test("Definition",()=>{
    expect(InfiniteScrollVideo).toBeDefined();
});

/////////////////////////

test("Render Correct",()=>{
    const scroll = (<InfiniteScrollVideo content={{name:"hola",dateAttached:new Date("January 22, 2012 06:32:32")}}/>);
    expect(scroll).toMatchSnapshot();
});

/////////////////////////

test("Test Empty Prop",()=>{
    const scroll = (<InfiniteScrollVideo content={{name:"hola",dateAttached:new Date("January 22, 2012 06:32:32")}}/>);
    expect(scroll.props.message).toBeUndefined();
});

/////////////////////////

test("Test State",()=>{
    const scroll = mount(<InfiniteScrollVideo content={[{name:"hola",dateAttached:new Date("January 22, 2012 06:32:32")}]}/>);
    scroll.setState({hasMore: false});
    expect(scroll.state().hasMore).toBe(false);
});

/////////////////////////

test("Test Seen all",()=>{
    const scroll = mount(<InfiniteScrollVideo content={[{name:"hola",dateAttached:new Date("January 22, 2012 06:32:32")}]}/>);
    const element = scroll.find("InfiniteScroll");
    expect(element.exists).toBeTruthy();
});

